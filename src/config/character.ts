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
                defaultAnimation: "default",
                animations: {
                    default: {
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
                defaultAnimation: "default",
                animations: {
                    default: {
                        loop: true,
                        frames: [
                            [0, 250],
                            [1, 250],
                            [3, 250],
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
                defaultAnimation: "default",
                animations: {
                    default: {
                        loop: true,
                        frames: [
                            [0, 250],
                            [1, 250],
                            [3, 250],
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
                defaultAnimation: "default",
                animations: {
                    default: {
                        loop: true,
                        frames: [
                            [0, 250],
                            [1, 250],
                            [3, 250],
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
                defaultAnimation: "default",
                animations: {
                    default: {
                        loop: true,
                        frames: [
                            [0, 250],
                            [1, 250],
                            [3, 250],
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
                defaultAnimation: "default",
                animations: {
                    default: {
                        loop: true,
                        frames: [
                            [0, 250],
                            [1, 250],
                            [3, 250],
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
                defaultAnimation: "default",
                animations: {
                    default: {
                        loop: true,
                        frames: [
                            [0, 250],
                            [1, 250],
                            [3, 250],
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
