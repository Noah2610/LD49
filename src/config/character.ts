import { CharacterEmotion, CharacterEmotionEvents } from "../character";
import { AnimationContainerConfig } from "../animation";
import { Emotion } from "../mood";
import { SpritesheetConfig } from "../spritesheet";

export interface CharacterConfig {
    emotions: {
        [E in Emotion]: CharacterEmotionConfig;
    };
}

export interface CharacterEmotionConfig {
    spritesheet: SpritesheetConfig;
    animations: AnimationContainerConfig;
    bgm?: CharacterEmotion["bgm"];
    events?: CharacterEmotionEvents;
}

const baseSpritesheet: Omit<SpritesheetConfig, "src"> = {
    spriteSize: {
        w: 48,
        h: 80,
    },
    size: {
        w: 192,
        h: 320,
    },
};

const defaultSpeechBubbleDespawnMs = 3000;

export const CHARACTER_CONFIG: CharacterConfig = {
    emotions: {
        Suicidal: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/sprites/suicidal.png"),
            },
            animations: {
                animations: {
                    idle: {
                        loop: true,
                        frames: [
                            [0, 150],
                            [1, 150],
                            [3, 150],
                            [4, 150],
                            [5, 150],
                            [6, 150],
                            [7, 150],
                        ],
                    },
                    other: {
                        loop: true,
                        frames: [
                            [9, 150],
                            [10, 150],
                            [11, 150],
                            [12, 150],
                            [13, 150],
                            [14, 150],
                            [15, 150],
                            [16, 150],
                            [17, 150],
                            [18, 150],
                        ],
                    },
                },
            },
            bgm: "sad3",
            events: {
                enter: {
                    type: "Actions",
                    actions: [
                        {
                            type: "Random",
                            actions: [
                                {
                                    type: "PlayCharacterAnimation",
                                    animation: "idle",
                                },
                                {
                                    type: "PlayCharacterAnimation",
                                    animation: "other",
                                },
                            ],
                        },
                        {
                            type: "AddText",
                            randomText: [
                                "Aaalwayys look onnn the briiiiiight sideee of Life!",
                                "OH NO. This... this is bad. I think i left my stove on.",
                                "So... what's your opinion on deez?",
                                "BOO! .......well, it was worth a try.",
                            ],
                        },
                        {
                            type: "SpawnSpeechBubble",
                            randomText: [
                                "...",
                                "...Make it stop...",
                                "Komm, süsser Tod.....",
                                "I..... I can see the light",
                                "... so bright..!",
                            ],
                            options: {
                                despawnMs: defaultSpeechBubbleDespawnMs,
                            },
                        },
                    ],
                },
                random: {
                    type: "SpawnSpeechBubble",
                    randomText: [
                        "...",
                        "...Make it stop...",
                        "Komm, süsser Tod.....",
                        "I..... I can see the light",
                        "... so bright..!",
                    ],
                    options: {
                        despawnMs: defaultSpeechBubbleDespawnMs / 2,
                    },
                },
            },
        },

        Depressed: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/sprites/depressed.png"),
            },
            animations: {
                animations: {
                    idle: {
                        loop: true,
                        frames: [
                            [0, 150],
                            [1, 150],
                            [2, 150],
                        ],
                    },
                },
            },
            bgm: "sad2",
            events: {
                enter: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: [
                                "Why the long face?",
                                "So..... what's your favorite movie?",
                                "What's wrong, buddy? Did you see a ghost?",
                            ],
                        },
                        {
                            type: "SpawnSpeechBubble",
                            randomText: [
                                "..........",
                                "................",
                                "*gulp*",
                                "Oh.... oh God",
                            ],
                            options: {
                                despawnMs: defaultSpeechBubbleDespawnMs,
                            },
                        },
                    ],
                },
                random: {
                    type: "SpawnSpeechBubble",
                    randomText: [
                        "..........",
                        "................",
                        "*gulp*",
                        "Oh.... oh God",
                    ],
                    options: {
                        despawnMs: defaultSpeechBubbleDespawnMs / 2,
                    },
                },
            },
        },

        Sad: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/sprites/sad.png"),
            },
            animations: {
                animations: {
                    idle: {
                        loop: true,
                        frames: [
                            [0, 170],
                            [1, 170],
                            [2, 170],
                            [3, 170],
                        ],
                    },
                },
            },
            bgm: "sad1",
            events: {
                enter: {
                    type: "SpawnSpeechBubble",
                    text: "I'm sad.",
                    options: {
                        despawnMs: defaultSpeechBubbleDespawnMs,
                    },
                },
            },
        },

        Calm: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/sprites/calm.png"),
            },
            animations: {
                animations: {
                    idle: {
                        loop: true,
                        frames: [
                            [0, 650],
                            [1, 950],
                            [2, 1150],
                        ],
                    },
                    other: {
                        loop: true,
                        frames: [
                            [4, 850],
                            [5, 1250],
                            [6, 550],
                        ],
                    },
                    high: {
                        loop: true,
                        frames: [
                            [8, 120],
                            [9, 120],
                            [10, 120],
                            [11, 120],
                            [12, 120],
                            [13, 120],
                            [14, 120],
                            [15, 120],
                        ],
                    },
                },
            },
            bgm: "happy1",
            events: {
                enter: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: [
                                "You seem exceptionally stable and healthy. How boring...",
                            ],
                        },
                        {
                            type: "SpawnSpeechBubble",
                            randomText: ["Hmm...", "C'est la vie. ...I guess"],
                            options: {
                                despawnMs: defaultSpeechBubbleDespawnMs,
                            },
                        },
                    ],
                },
                random: {
                    type: "SpawnSpeechBubble",
                    randomText: ["Hmm...", "C'est la vie. ...I guess"],
                    options: {
                        despawnMs: defaultSpeechBubbleDespawnMs / 2,
                    },
                },
            },
        },

        Happy: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/sprites/happy.png"),
            },
            animations: {
                animations: {
                    idle: {
                        loop: true,
                        frames: [
                            [0, 1100],
                            [1, 900],
                            [2, 1850],
                        ],
                    },
                    other: {
                        loop: true,
                        frames: [
                            [4, 1000],
                            [5, 200],
                            [6, 250],
                            [7, 150],
                        ],
                    },
                    high: {
                        loop: false,
                        frames: [
                            [9, 150],
                            [5, 150],
                            [10, 180],
                            [11, 220],
                            [12, 240],
                            [13, 320],
                            [14, 400],
                            [15, 460],
                            [16, 520],
                            [17, 600],
                            [18, 700],
                            [19, 800],
                            [20, 900],
                            [21, 100],
                        ],
                    },
                },
            },
            bgm: "happy1",
            events: {
                enter: {
                    type: "SpawnSpeechBubble",
                    text: "Funny!",
                    options: {
                        despawnMs: defaultSpeechBubbleDespawnMs,
                    },
                },
            },
        },

        Excited: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/sprites/excited.png"),
            },
            animations: {
                animations: {
                    idle: {
                        loop: true,
                        frames: [
                            [0, 100],
                            [1, 100],
                            [2, 100],
                        ],
                    },
                    other: {
                        loop: true,
                        frames: [
                            [4, 100],
                            [5, 100],
                        ],
                    },
                },
            },
            bgm: "happy2",
            events: {
                enter: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: [
                                "Anything good on?",
                                "Don't worry about your face, common side-effect, y'know.",
                                "Woah buddy, what's that on your face? You should really get that checked...",
                                "Say CHEEEEESE...",
                            ],
                        },
                        {
                            type: "SpawnSpeechBubble",
                            randomText: [
                                "ekEkkKEKKEkEekKEkEKKEkE",
                                "AAAAAAAAAAAAAAAAAAAAAA",
                                "oksoheresthethingifchickenfromeggandeggfromchickesnthennwhrecmoetehuorignslhicknefro-",
                                "OkSoHeresTheThingIfChickenFromEggAndEggFromChickesnThennWhreCmoeTehuOrignslhCickneFro-",
                                "Woww it's.. heh.. i mean. isn't it? Ye? Like, i mean, really hot, isn't it? heh.. he-",
                            ],
                            options: {
                                despawnMs: defaultSpeechBubbleDespawnMs,
                            },
                        },
                    ],
                },
                random: {
                    type: "SpawnSpeechBubble",
                    randomText: [
                        "ekEkkKEKKEkEekKEkEKKEkE",
                        "AAAAAAAAAAAAAAAAAAAAAA",
                        "oksoheresthethingifchickenfromeggandeggfromchickesnthennwhrecmoetehuorignslhicknefro-",
                        "OkSoHeresTheThingIfChickenFromEggAndEggFromChickesnThennWhreCmoeTehuOrignslhCickneFro-",
                        "Woww it's.. heh.. i mean. isn't it? Ye? Like, i mean, really hot, isn't it? heh.. he-",
                    ],
                    options: {
                        despawnMs: defaultSpeechBubbleDespawnMs / 2,
                    },
                },
            },
        },

        Manic: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/sprites/manic.png"),
            },
            animations: {
                animations: {
                    idle: {
                        loop: true,
                        frames: [
                            [0, 40],
                            [1, 40],
                            [2, 40],
                            [3, 40],
                            [4, 40],
                            [5, 40],
                            [6, 40],
                            [7, 40],
                            [8, 40],
                        ],
                    },
                    other: {
                        loop: true,
                        frames: [
                            [10, 80],
                            [11, 80],
                            [12, 80],
                            [13, 80],
                            [14, 80],
                        ],
                    },
                },
            },
            bgm: "happy2",
            events: {
                enter: {
                    type: "Actions",
                    actions: [
                        {
                            type: "AddText",
                            randomText: [
                                "Is this a bad time to get a coffee?",
                                "Don't take this the wrong way, but I think you need a haircut.",
                                `I believe the scientific term for what's about to commence is "Spontaneous Combustion"`,
                                "Mom!! Get the Camera!",
                                "Yo. This is metal as fuck.",
                                "The subject seems a little... unstable",
                            ],
                        },
                        {
                            type: "SpawnSpeechBubble",
                            randomText: [
                                "ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ",
                                " 	� 	� 	� 	� 	�",
                                "GNIDNECSA MA I",
                                "GGGNNNIIIDDDNNNEEECCCSSSAAA MMMAAA III",
                                "RIVERRUN ... FROM SWERVE OF SHORE ... VICUS OF RECIRCULATION",
                            ],
                            options: {
                                despawnMs: defaultSpeechBubbleDespawnMs,
                            },
                        },
                    ],
                },
                random: {
                    type: "SpawnSpeechBubble",
                    randomText: [
                        "ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ",
                        " 	� 	� 	� 	� 	�",
                        "GNIDNECSA MA I",
                        "GGGNNNIIIDDDNNNEEECCCSSSAAA MMMAAA III",
                        "RIVERRUN ... FROM SWERVE OF SHORE ... VICUS OF RECIRCULATION",
                    ],
                    options: {
                        despawnMs: defaultSpeechBubbleDespawnMs / 2,
                    },
                },
            },
        },
    },
};
