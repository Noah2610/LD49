import { Emotion, EMOTIONS } from "../mood";
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

export function generateLinearEmotionMoodMap(): EmotionMoodMap {
    const map: Partial<EmotionMoodMap> = {};
    const part = 1.0 / EMOTIONS.length;

    for (let i = 0; i < EMOTIONS.length; i++) {
        const emotion = EMOTIONS[i]!;
        map[emotion] = {
            min: part * i,
            max: part * (i + 1),
        };
    }

    return map as EmotionMoodMap;
}

// export const EMOTION_MOOD_MAP: EmotionMoodMap = {
//     Suicidal: {
//         min: 0.0,
//         max: 0.2,
//     },
//     Depressed: {
//         min: 0.2,
//         max: 0.3,
//     },
//     Sad: {
//         min: 0.3,
//         max: 0.4,
//     },
//     Calm: {
//         min: 0.45,
//         max: 0.55,
//     },
//     Happy: {
//         min: 0.6,
//         max: 0.7,
//     },
//     Excited: {
//         min: 0.7,
//         max: 0.8,
//     },
//     Manic: {
//         min: 0.8,
//         max: 1.0,
//     },
// };
