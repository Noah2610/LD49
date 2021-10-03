import { Action } from "../action";
import { ItemType } from "../item";

export type ItemsConfig = ItemConfig[];

export interface ItemConfig {
    type: ItemType;
    label?: string;
    action: Action;
}

export const ITEMS_CONFIG: ItemsConfig = [
    {
        type: "Syringe",
        label: "Syringe",
        action: {
            type: "Debug",
            message: "SYRINGE!",
        },
    },
    {
        type: "Toy",
        label: "Toy",
        action: {
            type: "Debug",
            message: "TOY!",
        },
    },
];
