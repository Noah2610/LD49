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

export const CHARACTER_CONFIG: CharacterConfig = {
    emotions: {
        Suicidal: {
            spritesheet: {
                src: require("../assets/spr_test_A.png"),
                spriteSize: {
                    w: 48,
                    h: 80,
                },
                size: {
                    w: 400,
                    h: 666,
                },
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
                src: require("../assets/spr_test_B.png"),
                spriteSize: {
                    w: 48,
                    h: 80,
                },
                size: {
                    w: 400,
                    h: 666,
                },
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
                src: require("../assets/spr_test_C.png"),
                spriteSize: {
                    w: 48,
                    h: 80,
                },
                size: {
                    w: 400,
                    h: 666,
                },
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
                src: require("../assets/spr_test_D.png"),
                spriteSize: {
                    w: 48,
                    h: 80,
                },
                size: {
                    w: 400,
                    h: 666,
                },
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
                src: require("../assets/spr_test_E.png"),
                spriteSize: {
                    w: 48,
                    h: 80,
                },
                size: {
                    w: 400,
                    h: 666,
                },
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
                src: require("../assets/spr_test_F.png"),
                spriteSize: {
                    w: 48,
                    h: 80,
                },
                size: {
                    w: 400,
                    h: 666,
                },
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
                src: require("../assets/spr_test_A.png"),
                spriteSize: {
                    w: 48,
                    h: 80,
                },
                size: {
                    w: 400,
                    h: 666,
                },
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
