import { Emotion, EMOTION_MOOD_MAP, Mood, MOOD_RANGE, VELOCITY_RANGE } from ".";

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

    const update: Mood["update"] = (dt) => {
        mood.value = Math.max(
            Math.min(mood.value + mood.velocity, MOOD_RANGE.max),
            MOOD_RANGE.min,
        );
        mood.emotion = emotionForMood(mood.value);

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
