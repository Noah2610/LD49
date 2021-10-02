import { Emotion } from "../mood";
import { Range } from "../util";

export const MOOD_RANGE: Range = {
    min: -100,
    max: 100,
};

export const VELOCITY_RANGE: Range = {
    min: -5,
    max: 5,
};

export type EmotionMoodMap = {
    [E in Emotion]: Range;
};

export const EMOTION_MOOD_MAP: EmotionMoodMap = {
    Suicidal: {
        min: -100,
        max: -70,
    },
    Depressed: {
        min: -70,
        max: -40,
    },
    Sad: {
        min: -40,
        max: -20,
    },
    Calm: {
        min: -20,
        max: 20,
    },
    Happy: {
        min: 20,
        max: 40,
    },
    Excited: {
        min: 40,
        max: 70,
    },
    Manic: {
        min: 70,
        max: 100,
    },
};