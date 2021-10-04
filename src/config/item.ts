import { SpritesheetConfig } from "../spritesheet";
import { Action } from "../action";
import { ItemType } from "../item";

export interface ItemConfig {
    types: {
        [T in ItemType]: ItemTypeConfig;
    };
    randomItems: RandomItemConfig[];
}

export interface ItemTypeConfig {
    type: ItemType;
    label?: string;
    action: Action;
}

export type RandomItemConfig = {
    spritesheet: SpritesheetConfig;
    color: ItemColor;
};

export type ItemColor = "red";

const ITEM_SRCS = {
    red: require("../assets/sprites/syringe.png"),
} as const;

const genItemSpritesheet = (src: string): SpritesheetConfig => ({
    src,
    spriteSize: {
        w: 32,
        h: 32,
    },
    size: {
        w: 128,
        h: 128,
    },
});

export const ITEM_CONFIG: ItemConfig = {
    randomItems: [
        {
            spritesheet: genItemSpritesheet(ITEM_SRCS.red),
            color: "red",
        },
        {
            spritesheet: genItemSpritesheet(ITEM_SRCS.red),
            color: "red",
        },
        {
            spritesheet: genItemSpritesheet(ITEM_SRCS.red),
            color: "red",
        },
    ],

    types: {
        Upper: {
            type: "Upper",
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
        Downer: {
            type: "Downer",
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
    },
};
