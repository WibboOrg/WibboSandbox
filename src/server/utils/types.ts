export interface IFurnitureData {
    wallitemtypes: {
      furnitype: IFurnitureType[]
    },
    roomitemtypes: {
      furnitype: IFurnitureType[]
    },
  }

export interface IFurnitureType {
    id: number,
    classname: string,
    name: string,
    description: string,
    offerid: number,
    type?: 's' | 'i'
}

export interface IProductCode {
  code: string;
  name: string;
  description: string;
}

export type CategoryKey =
  | "banner"
  | "backgrounds"
  | "badge"
  | "catalogue"
  | "navigator"
  | "reception"
  | "web_promo_small"
  | "notifications"
  | "wibbopages"
  | "icons"
  | "mp3"
  | "thumbnail"
  | "effect"
  | "figure"
  | "furniture"
  | "generic"
  | "pet"
  | "article"
  | "furni"
  | "upload"
  | "sound";

export type CategoryValue = {
  path: string;
  categoryType: string;
  ext: string;
};
