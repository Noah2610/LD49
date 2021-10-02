export interface Mood {
    value: number;
    velocity: number;
    emotion: Emotion;

    update(): void;
}

export const EMOTIONS = [
    "Depressed",
    "Sad",
    "Calm",
    "Content",
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
    Depressed: {
        min: -100,
        max: -69,
    },
    Sad: {
        min: -70,
        max: -39,
    },
    Calm: {
        min: -40,
        max: -19,
    },
    Content: {
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
