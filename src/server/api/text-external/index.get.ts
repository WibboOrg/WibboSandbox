export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const config = useRuntimeConfig()

  const data = await fetchServer<Record<string, string>>(config.urlAssets + 'gamedata-sandbox/ExternalTexts.json');

  return Object.entries(data).map(([key, value]) => { return { id: key, code: key, text: value } })
})
