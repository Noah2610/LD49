export interface Mood {
    value: number;
    velocity: number;
    emotion: Emotion;

    update(): void;
    setVelocity(vel: number): void;
    addVelocity(vel: number): void;
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
