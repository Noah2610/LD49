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
            type: "Actions",
            actions: [
                {
                    type: "Debug",
                    message: "SYRINGE!",
                },
                {
                    type: "MoodChange",
                    velocity: {
                        min: -5,
                        max: -1,
                    },
                },
            ],
        },
    },
    {
        type: "Toy",
        label: "Toy",
        action: {
            type: "Actions",
            actions: [
                {
                    type: "Debug",
                    message: "TOY!",
                },
                {
                    type: "MoodChange",
                    velocity: {
                        min: 1,
                        max: 5,
                    },
                },
            ],
        },
    },
];
