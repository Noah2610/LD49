import { SpritesheetConfig } from "../spritesheet";
import { Action } from "../action";
import { EmotionActions, ItemType } from "../item";

export interface ItemConfig {
    types: {
        [T in ItemType]: ItemTypeConfig;
    };
    randomItems: RandomItemConfig[];
}

export interface ItemTypeConfig {
    type: ItemType;
    label?: string;
    action?: Action;
    emotionActions?: EmotionActions;
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
            emotionActions: {
                Suicidal: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: [
                                "Wakey wakey, sunshine! ",
                                "Now now, don't be such a baby... ",
                            ],
                        },
                    ],
                },
                Depressed: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: ["Okok... happy now? "],
                        },
                    ],
                },
                Sad: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: ["Okok... happy now? "],
                        },
                    ],
                },
                Calm: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: [
                                "You seem exceptionally stable and healthy. How boring... ",
                            ],
                        },
                    ],
                },
                Happy: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: [
                                "No such thing as too much happiness, amirite? ",
                                "What could go wrong? ",
                                "Let's take it up a notch, shall we? ",
                            ],
                        },
                    ],
                },
                Excited: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: [
                                "No need to worry - I'm a professional! ",
                                "What? What about your liver? It'll grow back. ",
                                `What do you mean, "yOu'Re aBoUt To eXpLoDe"? `,
                                "Don't worry, bro. The ladies dig guys with acute heart failure ",
                            ],
                        },
                    ],
                },
                Manic: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: [
                                "Don't worry, it's just chemicals bro ",
                                "Well, here goes nothing... ",
                                "Can't have too much of a good thing! ...right? ",
                                "Ok mate, now take a deeeeeeep breath... ",
                            ],
                        },
                    ],
                },
            },
            action: {
                type: "Actions",
                actions: [
                    {
                        type: "MoodChange",
                        velocity: {
                            min: 5,
                            max: 10,
                        },
                    },
                ],
            },
        },
        Downer: {
            type: "Downer",
            label: "Syringe",
            emotionActions: {
                Suicidal: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: [
                                "Don't worry, it's just chemicals bro ",
                                "I am become death, conductor of irresponsible experiments ",
                                `"Risk breeds innovation" - Someone, probably `,
                                `"No risk no progress" - or something like that...`,
                                "Your sacrifice will not be in vain! ...ok I lied. ",
                                "What was his name again? -Uh, i mean, what is your name again? Paperwork, y'know... Hello? ",
                            ],
                        },
                    ],
                },
                Depressed: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: ["No risk no fun", "Oops... "],
                        },
                    ],
                },
                Sad: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: ["Oh, don't give me that look... "],
                        },
                    ],
                },
                Calm: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: [
                                "This might sting a little ",
                                "Okok but... why not? ",
                            ],
                        },
                    ],
                },
                Happy: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: [],
                        },
                    ],
                },
                Excited: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: [
                                "Let's not get TOO excited, m'kay? ",
                                "FINEEEE... you're such a buzzkill.. ",
                            ],
                        },
                    ],
                },
                Manic: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: ["Let's cool down a little, ye? "],
                        },
                    ],
                },
            },
            action: {
                type: "Actions",
                actions: [
                    {
                        type: "MoodChange",
                        velocity: {
                            min: -10,
                            max: -5,
                        },
                    },
                ],
            },
        },
    },
};
