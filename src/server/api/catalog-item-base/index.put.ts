import { ItemBase } from "@wibbo/prisma"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const itemBases = await readBody<ItemBase[]>(event)

  for (const {
    id, itemName, type, width, length, stackHeight, canStack, canSit, isWalkable, spriteId, allowRecycle, allowTrade, allowMarketplaceSell,
    allowGift, allowInventoryStack, interactionType, interactionModesCount, vendingIds, heightAdjustable, effectId, isRare, rarityLevel
  } of itemBases) {
    if (isValidField(itemName, type, width, length, stackHeight, canStack, canSit, isWalkable, spriteId, allowRecycle, allowTrade, allowMarketplaceSell, allowGift, allowInventoryStack, interactionType, interactionModesCount, vendingIds, heightAdjustable, effectId, isRare, rarityLevel) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est manquant' })
    }

    if (isValidNumber(id, width, length, stackHeight, spriteId, interactionModesCount, effectId, rarityLevel) === false ||
      isValidString(itemName, type, interactionType, heightAdjustable, vendingIds) === false ||
      isValidBoolean(canStack, canSit, isWalkable, allowRecycle, allowTrade, allowMarketplaceSell, allowGift, allowInventoryStack, isRare) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  for (const {
    id, itemName, type, width, length, stackHeight, canStack, canSit, isWalkable, spriteId, allowRecycle, allowTrade, allowMarketplaceSell,
    allowGift, allowInventoryStack, interactionType, interactionModesCount, vendingIds, heightAdjustable, effectId, isRare, rarityLevel
  } of itemBases) {
    itemBaseDao.update(id, {
      itemName, type, width, length, stackHeight, canStack, canSit, isWalkable, spriteId, allowRecycle, allowTrade, allowMarketplaceSell,
      allowGift, allowInventoryStack, interactionType, interactionModesCount, vendingIds, heightAdjustable, effectId, isRare, rarityLevel
    })
  }

  await logSandboxDao.create({
    method: 'put',
    editName: 'catalog-item-base',
    editKey: itemBases.map(x => x.id).join(', '),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  return null
})
