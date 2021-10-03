import { ItemType } from "../item";

export type ItemsConfig = ItemConfig[];

export interface ItemConfig {
    type: ItemType;
}

export const ITEMS_CONFIG: ItemsConfig = [
    {
        type: "Syringe",
    },
    {
        type: "Toy",
    },
];
