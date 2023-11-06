import sharp from 'sharp'

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const { id, onlyStaff, file } = await readBody < { id: number, onlyStaff: boolean, file: { base64: string, name: string } }>(event)

  if (isValidField(id, onlyStaff, file, file?.base64) === false) {
    throw createError({ statusCode: 400, message: 'Un champ est manquant' })
  }

  if (!/^[A-Za-z0-9_]+\.nitro$/.test(file.name)) {
    throw createError({ statusCode: 400, message: 'Nom du fichier ou extension incorrecte (mon_fichier_123.gif)' })
  }

  const imageBuffer = Buffer.from(file.base64, "base64");

  const imageMetadata = await sharp(imageBuffer).metadata()

  if (imageMetadata.width !== 40 || imageMetadata.height !== 40) {
    throw createError({ statusCode: 400, message: 'La taille du badge dois être 40x40' })
  }

  const fileName = file.name.split(".nitro")[0];

  const data = {
    effects: [{
      id: id,
      lib: fileName,
      type: 'fx',
      revision: 55555
    }]
  }

  const uploadData = [
    { 'action': 'upload', 'path': `bundled/effect/${file.name}`, 'data': file.base64 },
    { 'action': 'json', 'path': 'gamedata-sandbox/EffectMap.json', 'data': Buffer.from(JSON.stringify(data)).toString('base64') }
  ]

  if (await uploadApi('assets', uploadData) === false) {
    throw createError({ statusCode: 400, message: 'Problème lors de l\'importation' })
  }

  const emulatorEffetDto = useEmulatorEffectDao()
  emulatorEffetDto.create({ id, onlyStaff })

  return null
})
