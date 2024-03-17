export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const { urlAssets } = useRuntimeConfig().public

  const data = await fetchServer<Record<string, string>>(urlAssets + 'gamedata-sandbox/ExternalTexts.json');

  return Object.entries(data).map(([key, value]) => { return { id: key, code: key, text: value } })
})
