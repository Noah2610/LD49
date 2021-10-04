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
                    randomText: [
                        "This should calm him down.",
                        "Take this.",
                        "Cool down.",
                        "Take a rest.",
                        "This'll make you relax.",
                    ],
                },
                {
                    type: "SpawnSpeechBubble",
                    randomText: ["Drugs!", "No more.", "Don't do it!"],
                    options: {
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
                    randomText: [
                        "Life can be fun!",
                        "Let's play!",
                        "Play with me!",
                        "You want this?",
                    ],
                },
                {
                    type: "SpawnSpeechBubble",
                    randomText: ["Yeah!", "Let's go!", "This'll be fun!"],
                    options: {
                        despawnMs: 2000,
                    },
                },
            ],
        },
    },
];
