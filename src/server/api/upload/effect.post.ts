export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const { id, onlyStaff, file } = await readBody<{ id: number, onlyStaff: boolean, file: { base64: string, name: string } }>(event)

  if (isValidField(id, onlyStaff, file, file?.base64) === false) {
    throw createError({ statusCode: 400, message: 'Un champ est manquant' })
  }

  if (!/^[A-Za-z0-9_]+\.nitro$/.test(file.name)) {
    throw createError({ statusCode: 400, message: 'Nom du fichier ou extension incorrecte (mon_fichier_123.nitro)' })
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
    { 'action': 'json', 'path': 'gamedata-sandbox/EffectMap.json', 'data': JSON.stringify(data) }
  ]

  if (await uploadApi('assets', uploadData) === false) {
    throw createError({ statusCode: 400, message: 'Problème lors de l\'importation' })
  }

  await emulatorEffectDao.create({ id, onlyStaff })

  await logSandboxDao.create({
    method: 'post',
    editName: 'upload-effect',
    editKey: id.toString(),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  return null
})
