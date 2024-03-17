import { CatalogPage } from "@wibbo/prisma"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const catalogPages = await readBody<CatalogPage[]>(event)

  for (const { id, caption, enabled, iconImage, isPremium, orderNum, pageLayout, pageLink, pageStrings1, pageStrings2, parentId, requiredRight } of catalogPages) {
    if (isValidField(id, caption, enabled, iconImage, isPremium, orderNum, pageLayout, pageLink, pageStrings1, pageStrings2, parentId, requiredRight) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est manquant' })
    }

    if (isValidNumber(id, iconImage, orderNum, parentId) === false ||
        isValidString(caption, pageLayout, pageLink, pageStrings1, pageStrings2, requiredRight) === false ||
        isValidBoolean(enabled, isPremium) == false) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  for (const { id, caption, enabled, iconImage, isPremium, orderNum, pageLayout, pageLink, pageStrings1, pageStrings2, parentId, requiredRight } of catalogPages) {
    await catalogPageDao.update(id, { caption, enabled, iconImage, isPremium, orderNum, pageLayout, pageLink, pageStrings1, pageStrings2, parentId, requiredRight })
  }

  await logSandboxDao.create({
    method: 'put',
    editName: 'catalog-page',
    editKey: catalogPages.map(x => x.id).join(', '),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  return null
})
