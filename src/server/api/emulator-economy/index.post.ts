import { EmulatorEconomy } from '@wibbo/prisma'
import { z } from 'zod'

const EmulatorEconomySchema = z.object({
  id: z.number().positive(),
  averagePrice: z.number().positive(),
  categoryId: z.number().positive(),
  extraData: z.string().optional().nullable(),
  itemId: z.number().positive(),
});

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event);

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requise' });
  }

  const emulatorEconomies = await readBody<EmulatorEconomy[]>(event);
  try {
    emulatorEconomies.forEach((economy) => EmulatorEconomySchema.parse(economy));
  } catch (e: unknown) {
    throw createError({ statusCode: 400, message: 'Un champ est incorrect' });
  }

  const results: EmulatorEconomy[] = [];

  for (const { averagePrice, categoryId, extraData, itemId } of emulatorEconomies) {
    results.push(await emulatorEconomyDao.create({ averagePrice, categoryId, extraData, itemId }));
  }

  await logSandboxDao.create({
    method: 'post',
    editName: 'emulator-economy',
    editKey: results.map(x => x.id).join(', '),
    user: {
      connect: { id: sessionUser.id }
    }
  });

  return results;
});
