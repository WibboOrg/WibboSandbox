export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const { type, name, description, file, fileIcon } = await readBody<{ type: string, name: string, description: string, file: { base64: string, name: string }, fileIcon: { base64: string, name: string } }>(event)

  if (isValidField(type, name, description, file, file?.base64, fileIcon, fileIcon?.base64) === false) {
    throw createError({ statusCode: 400, message: 'Un champ est manquant' })
  }

  if (isValidString(type, name, description) === false) {
    throw createError({ statusCode: 400, message: 'Un champ est invalide' })
  }

  if (!/^[A-Za-z0-9_]+\.nitro$/.test(file.name)) {
    throw createError({ statusCode: 400, message: 'Nom du fichier ou extension incorrecte (mon_fichier_123.gif)' })
  }

  if (type !== 's' && type !== 'i') {
    throw createError({ statusCode: 400, message: 'Type incorrect' })
  }

  const furniName = file.name.split(".nitro")[0]

  const furniId = await itemBaseDao.getLastId()

  if (!furniId) {
    throw createError({ statusCode: 400, message: 'Problème lors de l\'importation' })
  }

  const newFurniId = furniId.id + 1

  const furniExist = await itemBaseDao.getOneByIdOrName(newFurniId, furniName)

  if (furniExist !== null) {
    throw createError({ statusCode: 400, message: 'Mobilier déjà existant' })
  }

  const funidataCode: Record<string, any> = {
    "id": newFurniId,
    "classname": furniName,
    "revision": 0,
    "category": "",
    "name": name || `${furniName} title`,
    "description": description || `${furniName} desc`,
    "adurl": "",
    "offerid": 0,
    "buyout": false,
    "rentofferid": -1,
    "rentbuyout": false,
    "customparams": "",
    "specialtype": 0,
    "bc": false,
    "excludeddynamic": false,
    "furniline": "",
    "environment": "",
    "rare": false,
  }

  if (type === 's') {
    funidataCode.defaultdir = "0";
    funidataCode.xdim = "0";
    funidataCode.ydim = "0";
    funidataCode.partcolors = { "color": [] };
    funidataCode.canstandon = false;
    funidataCode.cansiton = false;
    funidataCode.canlayon = false;
  }

  const funidata: Record<string, any> = {
    "roomitemtypes": {
      "furnitype": [funidataCode]
    }
  }

  if (type === 'i') {
    funidata["wallitemtypes"] = {
      "furnitype": [funidataCode]
    }
  }

  const uploadData = [
    { 'action': 'upload', 'path': `icons/${furniName}_icon.png`, 'data': fileIcon.base64 },
    { 'action': 'upload', 'path': `bundled/furniture/${file.name}`, 'data': file.base64 },
    { 'action': 'json', 'path': 'gamedata-sandbox/FurnitureData.json', 'data': JSON.stringify(funidata) }
  ]

  if (await uploadApi('assets', uploadData) === false) {
    throw createError({ statusCode: 400, message: 'Problème lors de l\'importation' })
  }

  await itemBaseDao.create({ catalogItem: { create: { id: newFurniId, catalogName: furniName, pageId: 1546145145 } }, itemName: furniName, spriteId: newFurniId, canSit: false, canStack: false, isWalkable: false })

  await logSandboxDao.create({
    method: 'post',
    editName: 'upload-furni',
    editKey: newFurniId.toString(),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  return null
})
