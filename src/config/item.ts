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
                        min: -10,
                        max: -5,
                    },
                },
                {
                    type: "AddText",
                    text: "This should calm him down.",
                },
                {
                    type: "SpawnSpeechBubble",
                    options: {
                        text: "Drugs!",
                        despawnMs: 2000,
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
                        min: 5,
                        max: 10,
                    },
                },
                {
                    type: "AddText",
                    text: "Life can be fun!",
                },
                {
                    type: "SpawnSpeechBubble",
                    options: {
                        text: "Yeah!",
                        despawnMs: 2000,
                    },
                },
            ],
        },
    },
];
