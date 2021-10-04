import { CharacterEmotion, CharacterEmotionEvents } from "../character";
import { AnimationContainerConfig } from "../animation";
import { Emotion } from "../mood";
import { SpritesheetConfig } from "../spritesheet";
import { Pos } from "../util";

export interface CharacterConfig {
    emotions: {
        [E in Emotion]: CharacterEmotionConfig;
    };
    gameOver: CharacterGameOverConfig;
}

export interface CharacterEmotionConfig extends CharacterPresentationConfig {}

export interface CharacterGameOverConfig {
    Suicidal: CharacterPresentationConfig;
    Manic: CharacterPresentationConfig;
}

export interface CharacterPresentationConfig {
    spritesheet: SpritesheetConfig;
    animations: AnimationContainerConfig;
    bgm?: CharacterEmotion["bgm"];
    events?: CharacterEmotionEvents;
    posOffset?: Pos;
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

const defaultSpeechBubbleDespawnMs = 4000;
const DEFAULT_ENTER_DELAY_MS = 3500;

export const CHARACTER_CONFIG: CharacterConfig = {
    emotions: {
        Suicidal: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/sprites/emotions/suicidal.png"),
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
                            [12, 110],
                            [13, 110],
                            [14, 110],
                            [15, 110],
                            [16, 150],
                            [17, 220],
                            [18, 300],
                            [17, 200],
                            [16, 150],
                            [15, 100],
                            [14, 100],
                            [13, 100],
                            [12, 100],
                            [11, 130],
                            [10, 150],
                            [9, 250],
                        ],
                    },
                },
            },
            bgm: "suicidal",
            events: {
                enter: {
                    type: "Delay",
                    delayMs: DEFAULT_ENTER_DELAY_MS,
                    action: {
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
                                    scrollConfig: {
                                        sfx: "text-suicidal1",
                                    },
                                },
                            },
                        ],
                    },
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
                        scrollConfig: {
                            sfx: "text-suicidal1",
                        },
                    },
                },
            },
        },

        Depressed: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/sprites/emotions/depressed.png"),
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
            bgm: "depressed",
            events: {
                enter: {
                    type: "Delay",
                    delayMs: DEFAULT_ENTER_DELAY_MS,
                    action: {
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
                                    "I.. I am a snail.",
                                    "...wh- why is it so c- co- cold..?",
                                    "They told me it would be different...",
                                    "Water... I need.. Wa-",
                                    "This is awful... truly awful.",
                                ],
                                options: {
                                    despawnMs: defaultSpeechBubbleDespawnMs,
                                    scrollConfig: {
                                        sfx: "text-sad2",
                                    },
                                },
                            },
                        ],
                    },
                },
                random: {
                    type: "SpawnSpeechBubble",
                    randomText: [
                        "..........",
                        "................",
                        "*gulp*",
                        "Oh.... oh God",
                        "I.. I am a snail.",
                        "...wh- why is it so c- co- cold..?",
                        "They told me it would be different...",
                        "Water... I need.. Wa-",
                        "This is awful... truly awful.",
                    ],
                    options: {
                        despawnMs: defaultSpeechBubbleDespawnMs / 2,
                        scrollConfig: {
                            sfx: "text-sad2",
                        },
                    },
                },
            },
        },

        Sad: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/sprites/emotions/sad.png"),
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
            bgm: "sad",
            events: {
                enter: {
                    type: "Delay",
                    delayMs: DEFAULT_ENTER_DELAY_MS,
                    action: {
                        type: "Actions",
                        actions: [
                            {
                                type: "AddText",
                                randomText: [
                                    "...Nice weather, huh? ",
                                    "You okay there, buddy? ",
                                ],
                            },
                            {
                                type: "SpawnSpeechBubble",
                                randomText: [
                                    "I...",
                                    "I'm feeling kind of down... ",
                                    ".....disgusting.",
                                    "I... Can I get some new pants, please?",
                                    "I always wanted to be a janitor...",
                                    "...I could really use a hug right now",
                                    "Man... this is awful.",
                                ],
                                options: {
                                    despawnMs: defaultSpeechBubbleDespawnMs,
                                    scrollConfig: {
                                        sfx: "text-sad1",
                                    },
                                },
                            },
                        ],
                    },
                },
                random: {
                    type: "SpawnSpeechBubble",
                    randomText: [
                        "I...",
                        "I'm feeling kind of down... ",
                        ".....disgusting.",
                        "I... Can I get some new pants, please?",
                        "I always wanted to be a janitor...",
                        "...I could really use a hug right now",
                        "Man... this is awful.",
                    ],
                    options: {
                        despawnMs: defaultSpeechBubbleDespawnMs / 2,
                        scrollConfig: {
                            sfx: "text-sad1",
                        },
                    },
                },
            },
        },

        Calm: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/sprites/emotions/calm.png"),
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
            bgm: "calm",
            events: {
                enter: {
                    type: "Delay",
                    delayMs: DEFAULT_ENTER_DELAY_MS,
                    action: {
                        type: "Actions",
                        actions: [
                            {
                                type: "AddText",
                                randomText: [
                                    "Subject exhibits no signs of unusual behavior. ",
                                    "Status: Subject seems exceptionally stable and healthy! ",
                                    "Subject exhibits no signs of unusual behavior. ",
                                    "Status: Subject seems exceptionally stable and healthy! ",
                                    "Subject stabilized.",
                                ],
                            },
                            {
                                type: "SpawnSpeechBubble",
                                randomText: [
                                    "Hmm... ",
                                    "C'est la vie. ...I guess ",
                                    "This is... alright... ",
                                    "... ",
                                    "Hmmmm.. now what? ",
                                    "Can I uhh... get some.. bread?",
                                ],
                                options: {
                                    despawnMs: defaultSpeechBubbleDespawnMs,
                                    scrollConfig: {
                                        sfx: "text-calm1",
                                    },
                                },
                            },
                        ],
                    },
                },
                random: {
                    type: "SpawnSpeechBubble",
                    randomText: [
                        "Hmm... ",
                        "C'est la vie. ...I guess ",
                        "This is... alright... ",
                        "... ",
                        "Hmmmm.. now what? ",
                        "Can I uhh... get some.. bread?",
                    ],
                    options: {
                        despawnMs: defaultSpeechBubbleDespawnMs / 2,
                        scrollConfig: {
                            sfx: "text-calm1",
                        },
                    },
                },
            },
        },

        Happy: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/sprites/emotions/happy.png"),
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
            bgm: "happy",
            events: {
                enter: {
                    type: "Delay",
                    delayMs: DEFAULT_ENTER_DELAY_MS,
                    action: {
                        type: "Actions",
                        actions: [
                            {
                                type: "AddText",
                                randomText: [
                                    "Subject exhibits no signs of unusual behavior. ",
                                    "Status: Subject seems exceptionally stable and healthy! ",
                                    "Subject exhibits no signs of unusual behavior. ",
                                    "Status: Subject seems exceptionally stable and healthy! ",
                                    "Subject stabalized.",
                                ],
                            },
                            {
                                type: "SpawnSpeechBubble",
                                randomText: [
                                    "Now that's a good one... hehe",
                                    "Keep 'em coming, Doc!",
                                    "I'll have two more of these!",
                                    "More of the same, c'mon c'mon c'mon!!!",
                                    "I'll have the green one - shaken, not stirred.",
                                ],
                                options: {
                                    despawnMs: defaultSpeechBubbleDespawnMs,
                                    scrollConfig: {
                                        sfx: "text-happy1",
                                    },
                                },
                            },
                        ],
                    },
                },
                random: {
                    type: "SpawnSpeechBubble",
                    randomText: [
                        "Now that's a good one... hehe",
                        "Keep 'em coming, Doc!",
                        "I'll have two more of these!",
                        "More of the same, c'mon c'mon c'mon!!!",
                        "I'll have the green one - shaken, not stirred.",
                    ],
                    options: {
                        despawnMs: defaultSpeechBubbleDespawnMs / 2,
                        scrollConfig: {
                            sfx: "text-happy1",
                        },
                    },
                },
            },
        },

        Excited: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/sprites/emotions/excited.png"),
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
            bgm: "excited",
            events: {
                enter: {
                    type: "Delay",
                    delayMs: DEFAULT_ENTER_DELAY_MS,
                    action: {
                        type: "Actions",
                        actions: [
                            {
                                type: "AddText",
                                randomText: [
                                    "Anything good on?",
                                    "Don't worry about your face, common side-effect, y'know.",
                                    "Woah buddy, what's that on your face? You should really get that checked...",
                                    "Say CHEEEEESE...",
                                    "So, when White Rabbit peaks...",
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
                                    "FAAASTEEEEEEEEEEER  ",
                                    "...TCHOO TCHOOO",
                                    "STAND IN MY WAY AND I SHALL SWALLOW YOU WHOLE",
                                    "RIVERRUN ... FROM SWERVE OF SHORE ... VICUS OF RECIRCULATION",
                                ],
                                options: {
                                    despawnMs: defaultSpeechBubbleDespawnMs,
                                    scrollConfig: {
                                        sfx: "text-happy2",
                                    },
                                },
                            },
                        ],
                    },
                },
                random: {
                    type: "SpawnSpeechBubble",
                    randomText: [
                        "ekEkkKEKKEkEekKEkEKKEkE",
                        "AAAAAAAAAAAAAAAAAAAAAA",
                        "oksoheresthethingifchickenfromeggandeggfromchickesnthennwhrecmoetehuorignslhicknefro-",
                        "OkSoHeresTheThingIfChickenFromEggAndEggFromChickesnThennWhreCmoeTehuOrignslhCickneFro-",
                        "Woww it's.. heh.. i mean. isn't it? Ye? Like, i mean, really hot, isn't it? heh.. he-",
                        "FAAASTEEEEEEEEEEER  ",
                        "...TCHOO TCHOOO",
                        "STAND IN MY WAY AND I SHALL SWALLOW YOU WHOLE",
                        "RIVERRUN ... FROM SWERVE OF SHORE ... VICUS OF RECIRCULATION",
                    ],
                    options: {
                        despawnMs: defaultSpeechBubbleDespawnMs / 2,
                        scrollConfig: {
                            sfx: "text-happy2",
                            updatePartEl(el) {
                                el.classList.add("text", "text--shake");
                                return el;
                            },
                        },
                    },
                },
            },
        },

        Manic: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/sprites/emotions/manic.png"),
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
            bgm: "manic",
            events: {
                enter: {
                    type: "Delay",
                    delayMs: DEFAULT_ENTER_DELAY_MS,
                    action: {
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
                                    "ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ",
                                    "ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ",
                                    " 	� 	� 	� 	� 	�",
                                    "GNIDNECSA MA I",
                                    "GGGNNNIIIDDDNNNEEECCCSSSAAA MMMAAA III",
                                    "I AM A MONSTER TRUCK",
                                    "THA MI GROINS A ’GABHAIL",
                                    `मैं शुद्ध ऊर्जा हू`,
                                ],
                                options: {
                                    despawnMs: defaultSpeechBubbleDespawnMs,
                                    scrollConfig: {
                                        sfx: [
                                            "text-manic1",
                                            "text-manic2",
                                            "text-manic3",
                                        ],
                                        updatePartEl(el) {
                                            el.classList.add(
                                                "text",
                                                "text--shake",
                                            );
                                            return el;
                                        },
                                    },
                                },
                            },
                        ],
                    },
                },
                random: {
                    type: "SpawnSpeechBubble",
                    randomText: [
                        "ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ",
                        "ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ",
                        " 	� 	� 	� 	� 	�",
                        "GNIDNECSA MA I",
                        "GGGNNNIIIDDDNNNEEECCCSSSAAA MMMAAA III",
                        "I AM A MONSTER TRUCK",
                        "THA MI GROINS A ’GABHAIL",
                        `मैं शुद्ध ऊर्जा हू`,
                    ],
                    options: {
                        despawnMs: defaultSpeechBubbleDespawnMs / 2,
                        scrollConfig: {
                            sfx: ["text-manic1", "text-manic2", "text-manic3"],
                            updatePartEl(el) {
                                el.classList.add("text", "text--shake");
                                return el;
                            },
                        },
                    },
                },
            },
        },
    },

    gameOver: {
        Suicidal: {
            spritesheet: {
                src: require("../assets/sprites/gameOver/death_S.png"),
                spriteSize: {
                    w: 80,
                    h: 32,
                },
                size: {
                    w: 320,
                    h: 128,
                },
            },
            animations: {
                animations: {
                    gameOver: {
                        loop: false,
                        frames: [
                            [0, 600],
                            [1, 400],
                            [2, 200],
                            [3, 200],
                            [4, 200],
                            [5, 200],
                            [6, 300],
                            [7, 350],
                            [8, 380],
                            [9, 500],
                        ],
                    },
                },
            },
            posOffset: {
                x: 0,
                y: 128,
            },
        },

        Manic: {
            spritesheet: {
                src: require("../assets/sprites/gameOver/death_M.png"),
                spriteSize: {
                    w: 160,
                    h: 140,
                },
                size: {
                    w: 640,
                    h: 560,
                },
            },
            animations: {
                animations: {
                    gameOver: {
                        loop: false,
                        frames: [
                            [0, 70],
                            [1, 70],
                            [2, 70],
                            [3, 70],
                            [4, 70],
                            [5, 70],
                            [6, 70],
                            [7, 70],
                            [8, 70],
                            [9, 70],
                            [10, 70],
                            [11, 70],
                            [12, 70],
                            [13, 70],
                            [14, 70],
                            [15, 70],
                            [16, 200],
                            [17, 500],
                            [18, 600],
                            [19, 800],
                            [20, 1000],
                        ],
                    },
                },
            },
        },
    },
};
