import { AnimationContainerConfig } from "../animation";
import { Emotion } from "../mood";
import { SpritesheetConfig } from "../spritesheet";

export interface CharacterConfig {
    emotions: {
        [E in Emotion]: {
            spritesheet: SpritesheetConfig;
            animations: AnimationContainerConfig;
        };
    };
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
                src: require("../assets/spr_test_A.png"),
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
        },

        Depressed: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/spr_test_B.png"),
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
        },

        Sad: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/spr_test_C.png"),
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
        },

        Calm: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/spr_test_D.png"),
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
        },

        Happy: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/spr_test_E.png"),
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
        },

        Excited: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/spr_test_F.png"),
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
        },

        Manic: {
            spritesheet: {
                ...baseSpritesheet,
                src: require("../assets/spr_test_A.png"),
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
        },
    },
};
