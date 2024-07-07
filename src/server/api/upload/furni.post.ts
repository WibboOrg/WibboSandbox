export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const { type, name, description, file, fileIcon, colors } = await readBody<{ type: string, name: string, description: string, file: { base64: string, name: string }, fileIcon: { base64: string, name: string }, colors: number[] }>(event)

  if (isValidField(type, name, description, file, file?.base64, fileIcon, fileIcon?.base64) === false) {
    throw createError({ statusCode: 400, message: 'Un champ est manquant' })
  }

  if (isValidString(type, name, description) === false || isValidBase64(file.base64, fileIcon.base64) === false) {
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

  let colorIds = colors
  if (colorIds == null || colorIds.length === 0) {
    colorIds = [-1]
  }

  const newFurnitures = []
  let newFurniId = furniId.id
  const funidataCodes = []
  for (const colorId of colorIds) {
    newFurniId++

    const furniNameWithColor = colorId === -1 ? furniName : `${furniName}*${colorId}`

    const furniExist = await itemBaseDao.getOneByIdOrName(newFurniId, furniNameWithColor)

    if (furniExist !== null) {
      throw createError({ statusCode: 400, message: 'Mobilier déjà existant' })
    }

    const funidataCode: Record<string, any> = {
      "id": newFurniId,
      "classname": furniNameWithColor,
      "revision": 0,
      "category": "",
      "name": `${name}${colorId === -1 ? '' : ` ${colorId}`}` || `${furniNameWithColor} title`,
      "description": description || `${furniNameWithColor} desc`,
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

    funidataCodes.push(funidataCode)
    newFurnitures.push({ id: newFurniId, name: furniNameWithColor, color: colorId })
  }

  const funidata: Record<string, object> = {}
  if (type === 's') {
    funidata["roomitemtypes"] = {
      "furnitype": [...funidataCodes]
    }
  } else {
    funidata["wallitemtypes"] = {
      "furnitype": [...funidataCodes]
    }
  }

  const uploadData = [
    { 'action': 'upload', 'path': `bundled/furniture/${file.name}`, 'data': file.base64 },
    { 'action': 'json', 'path': 'gamedata-sandbox/FurnitureData.json', 'data': JSON.stringify(funidata) }
  ]

  for (const newFurni of newFurnitures) {
    const color = (newFurni.color == -1) ? '' : '_' + newFurni.color;
    uploadData.push({ 'action': 'upload', 'path': `icons/${furniName + color}_icon.png`, 'data': fileIcon.base64 })
  }

  if (await uploadApi('assets', uploadData) === false) {
    throw createError({ statusCode: 400, message: 'Problème lors de l\'importation' })
  }

  for (const newFurni of newFurnitures) {
    await itemBaseDao.create({ catalogItem: { create: { id: newFurni.id, catalogName: newFurni.name, pageId: 1546145145 } }, itemName: newFurni.name, spriteId: newFurni.id, canSit: false, canStack: false, isWalkable: false })
  }

  await logSandboxDao.create({
    method: 'post',
    editName: 'upload-furni',
    editKey: newFurnitures.map(x => x.id).join(', '),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  return null
})
