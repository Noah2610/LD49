import { Range } from "../util";
import {
    EmotionMoodMap,
    generateLinearEmotionMoodMap,
    MOOD_RANGE,
    VELOCITY_RANGE,
} from "../config/mood";
import { Emotion, Mood } from ".";

export function createMood(): Mood {
    const emotionMoodMap = createMappedEmotionMoodMap(
        generateLinearEmotionMoodMap(),
    );

    const emotionForMood = (moodValue: number): Emotion | null => {
        const emotion = (Object.keys(emotionMoodMap) as Emotion[]).find(
            (emotion) => {
                const range = emotionMoodMap[emotion]!;
                return moodValue >= range.min && moodValue <= range.max;
            },
        );
        if (!emotion) {
            console.error(
                `[emotionForMood] Couldn't find emotion for mood ${moodValue}`,
            );
        }
        return emotion || null;
    };

    const emotion = emotionForMood(0) || "Calm";

    const update: Mood["update"] = (dt) => {
        mood.value = Math.max(
            Math.min(mood.value + mood.velocity, MOOD_RANGE.max),
            MOOD_RANGE.min,
        );

        const emotion = emotionForMood(mood.value);
        if (emotion) {
            mood.emotion = emotion;
        }

        const barEl = document.querySelector<HTMLElement>("#game #mood-bar");
        if (barEl) {
            const minAbs = Math.abs(MOOD_RANGE.min);
            const perc =
                ((mood.value + minAbs) / (minAbs + MOOD_RANGE.max)) * 100;
            barEl.style.width = `${perc}%`;
        }
    };

    const setVelocity: Mood["setVelocity"] = (vel) => {
        mood.velocity = Math.max(
            Math.min(vel, VELOCITY_RANGE.max),
            VELOCITY_RANGE.min,
        );
    };

    const addVelocity: Mood["addVelocity"] = (vel) => {
        mood.setVelocity(mood.velocity + vel);
    };

    const mood: Mood = {
        value: 0,
        velocity: 0,
        emotion,
        update,
        setVelocity,
        addVelocity,
    };

    return mood;
}

function createMappedEmotionMoodMap(
    percentMap: EmotionMoodMap,
): EmotionMoodMap {
    const map = (perc: number): number => lerp(MOOD_RANGE, perc);
    return (Object.keys(percentMap) as Emotion[]).reduce<EmotionMoodMap>(
        (acc, emotion) => ({
            ...acc,
            [emotion]: {
                min: map(percentMap[emotion].min),
                max: map(percentMap[emotion].max),
            },
        }),
        {} as EmotionMoodMap,
    );
}

function lerp(range: Range, perc: number): number {
    return range.min + perc * (range.max - range.min);
}
