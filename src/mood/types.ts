export interface Mood {
    value: number;
    velocity: number;
    emotion: Emotion;

    update(dt: number): void;
}

export const EMOTIONS = [
    "Suicidal",
    "Depressed",
    "Sad",
    "Calm",
    "Happy",
    "Excited",
    "Manic",
] as const;

export type Emotion = typeof EMOTIONS[number];

export type EmotionMoodMap = {
    [E in Emotion]: EmotionMoodRange;
};

export interface EmotionMoodRange {
    min: number;
    max: number;
}

export const EMOTION_MOOD_MAP: EmotionMoodMap = {
    Suicidal: {
        min: -100,
        max: -69,
    },
    Depressed: {
        min: -70,
        max: -39,
    },
    Sad: {
        min: -40,
        max: -19,
    },
    Calm: {
        min: -20,
        max: 20,
    },
    Happy: {
        min: 21,
        max: 40,
    },
    Excited: {
        min: 41,
        max: 70,
    },
    Manic: {
        min: 70,
        max: 100,
    },
};
