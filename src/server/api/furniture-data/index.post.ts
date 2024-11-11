import { CatalogPage, ItemBaseType } from "@wibbo/prisma";

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event);

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requise' });
  }

  const { urlAssets } = useRuntimeConfig().public;

  const furniData = await fetchServer<IFurnitureData>(`${urlAssets}gamedata-sandbox/FurnitureData.json`);
  let newFurniData = { wallitemtypes: { furnitype: [] }, roomitemtypes: { furnitype: [] }} as IFurnitureData
  let product: { productdata: { product: IProductCode[] } } = { productdata: { product: [] } };

  const catalogPageCaption: { [key: number]: string | null } = {};
    const getCatalogPageCaption = async (id: number) => {
    if (catalogPageCaption[id]) return catalogPageCaption[id];

    const page = await catalogPageDao.getOne(id);
    catalogPageCaption[id] = (page && page.requiredRight === '') ? page.caption : null;
    return catalogPageCaption[id];
  }

  const processItem = async (item: IFurnitureType, type: ItemBaseType) => {
    const id = item.id;
    let { name, description } = item;

    const catalogItem = await catalogItemDao.getOneBySpriteIdAndType(id, type);
    if (!catalogItem) {
      return false;
    }

    if (!name || name.endsWith(' name')) {
      const catalogPageCaption = await getCatalogPageCaption(catalogItem.pageId);
      name = catalogPageCaption ? `Mobilier ${catalogPageCaption}` : name;
    }

    if (!description || description.endsWith(' desc')) {
      description = 'Parfait pour ton appart';
    }

    item.name = name.replace(/Habbo/gi, 'Wibbo');
    item.description = description.replace(/Habbo/gi, 'Wibbo');
    item.offerid = catalogItem.id;

    return true
  };

  const processItems = async (items: IFurnitureType[], type: ItemBaseType) => {
    for (const item of items) {
      const isProcess = await processItem(item, type);
      if (isProcess) {
        if (type === 's') {
          newFurniData.roomitemtypes.furnitype.push(item);
        } else {
          newFurniData.wallitemtypes.furnitype.push(item);
        }

        product.productdata.product.push({ code: item.classname, name: item.name, description: item.description });
      }
    }
  };

  await Promise.all([
    processItems(furniData.roomitemtypes.furnitype, 's'),
    processItems(furniData.wallitemtypes.furnitype, 'i')
  ]);

  const uploadData = [
    {
      action: 'upload',
      path: 'gamedata-sandbox/FurnitureData.json',
      data: Buffer.from(JSON.stringify(newFurniData)).toString('base64'),
      compressed: true
    },
    {
      action: 'upload',
      path: 'gamedata-sandbox/ProductData.json',
      data: Buffer.from(JSON.stringify(product)).toString('base64'),
      compressed: true
    }
  ];

  if (!(await uploadApi('assets', uploadData))) {
    throw createError({ statusCode: 400, message: 'Problème lors de l\'importation' });
  }

  await logSandboxDao.create({
    method: 'post',
    editName: 'furniture-data',
    editKey: 'all',
    user: {
      connect: { id: sessionUser.id }
    }
  });

  return null;
});
