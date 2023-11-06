import { CatalogPage } from "wibboprisma"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const { caption, enabled, iconImage, isPremium, orderNum, pageLayout, pageLink, pageStrings1, pageStrings2, parentId, requiredRight } = await readBody<CatalogPage>(event)

  if (isValidField(caption, enabled, iconImage, isPremium, orderNum, pageLayout, pageLink, pageStrings1, pageStrings2, parentId, requiredRight) === false) {
    throw createError({ statusCode: 400, message: 'Un champ est manquant' })
  }

  if (isValidNumber(iconImage, orderNum, parentId) === false ||
    isValidString(caption, pageLayout, pageLink, pageStrings1, pageStrings2, requiredRight) === false ||
    isValidBoolean(enabled, isPremium)) {
    throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
  }

  const catalogPageDao = useCatalogPageDao()

  return catalogPageDao.create({ caption, enabled, iconImage, isPremium, orderNum, pageLayout, pageLink, pageStrings1, pageStrings2, parentId, requiredRight })
})