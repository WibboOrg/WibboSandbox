export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const { urlAssets } = useRuntimeConfig().public

  // const textBadge = await useStorage().getItem<Record<string, string>>('text-badge')

  // if (textBadge) {
  //   return Object.entries(textBadge).map(([key, value]) => { return { id: key, code: key, text: value } })
  // }

  const data = await fetchServer<Record<string, string>>(urlAssets + 'gamedata-sandbox/BadgeTexts.json');

  // await useStorage().setItem('text-badge', data)

  return Object.entries(data).map(([key, value]) => { return { id: key, code: key, text: value } })
})
