import { Emotion, EMOTION_MOOD_MAP, Mood } from ".";

export function createMood(): Mood {
    const emotionForMood = (moodValue: number): Emotion => {
        const emotion = (Object.keys(EMOTION_MOOD_MAP) as Emotion[]).find(
            (emotion) => {
                const range = EMOTION_MOOD_MAP[emotion]!;
                return moodValue >= range.min && moodValue <= range.max;
            },
        );
        if (!emotion) {
            throw new Error(
                `[emotionForMood] Couldn't find emotion for mood ${moodValue}`,
            );
        }
        return emotion;
    };

    const emotion = emotionForMood(0);

    const update: Mood["update"] = () => {
        mood.value += mood.velocity;
        mood.emotion = emotionForMood(mood.value);
    };

    const mood: Mood = {
        value: 0,
        velocity: 0,
        emotion,
        update,
    };

    return mood;
}