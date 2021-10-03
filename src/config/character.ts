import { CharacterEmotion } from "../character";
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
    audio: CharacterEmotion["audio"];
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

export const CHARACTER_CONFIG: CharacterConfig = {
    emotions: {
        Suicidal: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/spr_suicidal.png"),
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
            audio: {
                bgm: "sad3",
            },
        },

        Depressed: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/spr_depressed.png"),
            },
            animations: {
                animations: {
                    idle: {
                        loop: true,
                        frames: [
                            [0, 150],
                            [1, 150],
                            [3, 150],
                        ],
                    },
                },
            },
            audio: {
                bgm: "sad2",
            },
        },

        Sad: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/spr_sad.png"),
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
            audio: {
                bgm: "sad1",
            },
        },

        Calm: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/spr_calm.png"),
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
            audio: {
                bgm: "happy1",
            },
        },

        Happy: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/spr_happy.png"),
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
            audio: {
                bgm: "happy1",
            },
        },

        Excited: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/spr_excited.png"),
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
            audio: {
                bgm: "happy2",
            },
        },

        Manic: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/spr_manic.png"),
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
            audio: {
                bgm: "happy2",
            },
        },
    },
};
