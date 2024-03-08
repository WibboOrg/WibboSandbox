import sharp from 'sharp'

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const { code, name, description, file } = await readBody<{ code: string, name: string, description: string, file: { base64: string, name: string } }>(event)

  if (isValidField(code, name, description, file, file?.base64) === false) {
    throw createError({ statusCode: 400, message: 'Un champ est manquant' })
  }

  if (isValidString(code, name, description) === false) {
    throw createError({ statusCode: 400, message: 'Un champ est invalide' })
  }

  if (!/^[A-Za-z0-9_]+\.gif$/.test(file.name)) {
    throw createError({ statusCode: 400, message: 'Nom du fichier ou extension incorrecte (mon_fichier_123.gif)' })
  }

  if (!/^[A-Za-z0-9_]+$/.test(code)) {
    throw createError({ statusCode: 400, message: 'Le code du badge est incorrect (mon_badge_123)' })
  }

  const imageBuffer = Buffer.from(file.base64, "base64");

  const imageMetadata = await sharp(imageBuffer).metadata()

  if (imageMetadata.width !== 40 || imageMetadata.height !== 40) {
    throw createError({ statusCode: 400, message: 'La taille du badge dois être 40x40' })
  }

  const data = {
    [`badge_name_${code}`]: name,
    [`badge_desc_${code}`]: description
  }

  const uploadData = [
    { 'action': 'upload', 'path': `c_images/album1584/${code}.gif`, 'data': file.base64 },
    { 'action': 'json', 'path': 'gamedata-sandbox/BadgeTexts.json', 'data': JSON.stringify(data) }
  ]

  if (await uploadApi('assets', uploadData) === false) {
    throw createError({ statusCode: 400, message: 'Problème lors de l\'importation' })
  }

  return null
})
