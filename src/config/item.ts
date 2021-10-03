import { ItemType } from "../item";

export type ItemsConfig = ItemConfig[];

export interface ItemConfig {
    type: ItemType;
    label?: string;
}

export const ITEMS_CONFIG: ItemsConfig = [
    {
        type: "Syringe",
        label: "Syringe",
    },
    {
        type: "Toy",
        label: "Toy",
    },
];
