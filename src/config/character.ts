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
        },
    },
};
