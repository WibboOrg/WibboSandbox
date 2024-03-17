import { CatalogPage } from "@wibbo/prisma"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const catalogPages = await readBody<CatalogPage[]>(event)

  for (const { caption, enabled, iconImage, isPremium, orderNum, pageLayout, pageLink, pageStrings1, pageStrings2, parentId, requiredRight } of catalogPages) {
    if (isValidField(caption, enabled, iconImage, isPremium, orderNum, pageLayout, pageLink, pageStrings1, pageStrings2, parentId, requiredRight) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est manquant' })
    }

    if (isValidNumber(iconImage, orderNum, parentId) === false ||
      isValidString(caption, pageLayout, pageLink, pageStrings1, pageStrings2, requiredRight) === false ||
      isValidBoolean(enabled, isPremium) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  const results: CatalogPage[] = []

  for (const { caption, enabled, iconImage, isPremium, orderNum, pageLayout, pageLink, pageStrings1, pageStrings2, parentId, requiredRight } of catalogPages) {
    results.push(await catalogPageDao.create({ caption, enabled, iconImage, isPremium, orderNum, pageLayout, pageLink, pageStrings1, pageStrings2, parentId, requiredRight }))
  }

  await logSandboxDao.create({
    method: 'post',
    editName: 'catalog-page',
    editKey: results.map(x => x.id).join(', '),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  return results
})
