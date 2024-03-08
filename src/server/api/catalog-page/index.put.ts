import { CatalogPage } from "wibboprisma"

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
      isValidBoolean(enabled, isPremium)) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  const catalogPageDao = useCatalogPageDao()

  for (const { id, caption, enabled, iconImage, isPremium, orderNum, pageLayout, pageLink, pageStrings1, pageStrings2, parentId, requiredRight } of catalogPages) {
    await catalogPageDao.update(id, { caption, enabled, iconImage, isPremium, orderNum, pageLayout, pageLink, pageStrings1, pageStrings2, parentId, requiredRight })
  }

  return null
})
