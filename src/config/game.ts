import { Range } from "../util";

export interface GameConfig {
    ups: number;
    moodSwing: {
        intervalMs: number;
        strengthRange: Range;
    };
}

export const GAME_CONFIG: GameConfig = {
    ups: 10,
    moodSwing: {
        intervalMs: 5000,
        strengthRange: {
            min: 1,
            max: 2,
        },
    },
};
