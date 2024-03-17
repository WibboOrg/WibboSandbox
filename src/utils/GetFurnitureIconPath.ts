
export const getFurnitureIconPath = (furniName: string) => {
  const [name, colorId] = furniName.split('*');
  const colorSuffix = colorId && colorId !== '-1' ? `_${colorId}` : '';
  return `icons/${name}${colorSuffix}_icon.png`;
}

