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
    labelRevealed?: string;
    action?: Action;
    emotionActions?: EmotionActions;
}

export type RandomItemConfig = {
    spritesheet: SpritesheetConfig;
};

export type ItemColor = "red";

const ITEM_SRCS = {
    blue: require("../assets/sprites/syringes/syringe-blue.png"),
    green: require("../assets/sprites/syringes/syringe-green.png"),
    red: require("../assets/sprites/syringes/syringe-red.png"),
    yellow: require("../assets/sprites/syringes/syringe-yellow.png"),
} as const;

const genItemSpritesheet = (src: string): SpritesheetConfig => ({
    src,
    spriteSize: {
        w: 24,
        h: 24,
    },
    size: {
        w: 96,
        h: 96,
    },
});

export const ITEM_CONFIG: ItemConfig = {
    randomItems: [
        {
            spritesheet: genItemSpritesheet(ITEM_SRCS.blue),
        },
        {
            spritesheet: genItemSpritesheet(ITEM_SRCS.green),
        },
        {
            spritesheet: genItemSpritesheet(ITEM_SRCS.red),
        },
        {
            spritesheet: genItemSpritesheet(ITEM_SRCS.yellow),
        },
    ],

    types: {
        Upper: {
            type: "Upper",
            label: "Syringe",
            labelRevealed: "Upper Syringe",
            emotionActions: {
                Suicidal: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: [
                                "Wakey wakey, sunshine! ",
                                "Now now, don't be such a baby... ",
                                "This'll get you on your feet again - not even close!",
                            ],
                        },
                    ],
                },
                Depressed: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: [
                                "Okok... happy now?",
                                "There ya go. Enjoy!",
                            ],
                        },
                    ],
                },
                Sad: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: [
                                "Okok... happy now? ",
                                "Have some backbone, man. ",
                                "Cheer up, it's a beautiful day!",
                            ],
                        },
                    ],
                },
                Calm: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: [
                                "Let's put a smile on that face of yours! ",
                                "Here comes the juice!",
                                "Ominous substance of undisclosed effect - Coming right up!",
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
                                "Let's get funky. ",
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
                                "Don't worry, this should get you fixed up. ...oops, wrong one.  ",
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
            labelRevealed: "Downer Syringe",
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
                            randomText: [
                                "Why do I always get these mixed up...",
                                "DAMN. Always getting these mixed up.....",
                                "Oops... ",
                                "Queue the violin...",
                            ],
                        },
                    ],
                },
                Sad: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: [
                                "Oh, don't give me that look... ",
                                "For SCIENCE!",
                                "AGAIN! Why can't we just put labels on these?",
                                "Red? No. Green. It's green, definitely green..... right?",
                            ],
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
                                "There you go.",
                                "Fret not, I am a professional.",
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
                                "Woah there, happiness is to be consumed responsibly.",
                                "Balance is the key.",
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
                            randomText: [
                                "Let's cool down a little, ye?",
                                "'Do No Harm'",
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
                            min: -10,
                            max: -5,
                        },
                    },
                ],
            },
        },
    },
};
