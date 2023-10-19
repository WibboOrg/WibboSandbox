import { CatalogPage } from "@prisma/client"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const { id, caption, enabled, icon_image, is_premium, order_num, page_layout, page_link, page_strings_1, page_strings_2, parent_id, required_right } = await readBody<CatalogPage>(event)

  if (isValidField(id, caption, enabled, icon_image, is_premium, order_num, page_layout, page_link, page_strings_1, page_strings_2, parent_id, required_right) === false) {
    throw createError({ statusCode: 400, message: 'Un champ est manquant' })
  }

  if (isValidNumber(id, icon_image, order_num, parent_id) === false ||
    isValidString(caption, page_layout, page_link, page_strings_1, page_strings_2, required_right) === false ||
    isValidBoolean(enabled, is_premium)) {
    throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
  }

  const catalogPageDao = useCatalogPageDao()

  catalogPageDao.update(id, { caption, enabled, icon_image, is_premium, order_num, page_layout, page_link, page_strings_1, page_strings_2, parent_id, required_right })

  return null
})