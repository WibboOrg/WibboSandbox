import { ItemBase } from "@prisma/client"

export default defineEventHandler(async (event) => {
    const sessionUser = getSessionUser(event)

    if (sessionUser.rank < 11) {
        throw createError({ statusCode: 400, message: 'Permission requis' })
    }

    const { id, item_name, type, width, length, stack_height, can_stack, can_sit, is_walkable, sprite_id, allow_recycle, allow_trade, allow_marketplace_sell,
        allow_gift, allow_inventory_stack, interaction_type, interaction_modes_count, vending_ids, height_adjustable, effect_id, is_rare, rarity_level } = await readBody<ItemBase>(event)

    if (isValidField(item_name, type, width, length, stack_height, can_stack, can_sit, is_walkable, sprite_id, allow_recycle, allow_trade, allow_marketplace_sell, allow_gift, allow_inventory_stack, interaction_type, interaction_modes_count, vending_ids, height_adjustable, effect_id, is_rare, rarity_level) === false) {
        throw createError({ statusCode: 400, message: 'Un champ est manquant' })
    }

    if (isValidNumber(id, width, length, stack_height, sprite_id, interaction_modes_count, effect_id, rarity_level) === false ||
        isValidString(item_name, type, interaction_type, height_adjustable, vending_ids) === false ||
        isValidBoolean(can_stack, can_sit, is_walkable, allow_recycle, allow_trade, allow_marketplace_sell, allow_gift, allow_inventory_stack, is_rare) === false) {
        throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }

    const itemBaseDao = useItemBaseDao()

    itemBaseDao.update(id, {
        item_name, type, width, length, stack_height, can_stack, can_sit, is_walkable, sprite_id, allow_recycle, allow_trade, allow_marketplace_sell,
        allow_gift, allow_inventory_stack, interaction_type, interaction_modes_count, vending_ids, height_adjustable, effect_id, is_rare, rarity_level
    })

    return null
})
