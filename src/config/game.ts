import { Range } from "../util";

export interface GameConfig {
    ups: number;
    moodSwing: {
        intervalMs: number;
        strengthRange: Range;
    };
    randomEvent: {
        intervalMs: number;
    };
    difficulty: {
        increaseEveryMs: number;
        increaseBy: number;
    };
}

export const GAME_CONFIG: GameConfig = {
    ups: 10,
    moodSwing: {
        intervalMs: 2000,
        strengthRange: {
            min: -1,
            max: 1,
        },
    },
    randomEvent: {
        intervalMs: 10000,
    },
    difficulty: {
        increaseEveryMs: 2000,
        increaseBy: 0.2,
    },
};
