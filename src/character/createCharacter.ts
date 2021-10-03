import { createAnimationContainer } from "../animation/createAnimationContainer";
import { createSpritesheet } from "../spritesheet";
import { createMood, EMOTIONS } from "../mood";
import { CHARACTER_CONFIG } from "../config/character";
import { Character, CharacterEmotions } from ".";

export async function createCharacter(): Promise<Character> {
    const emotions: Partial<CharacterEmotions> = {};

    await Promise.all(
        EMOTIONS.map((emotion) =>
            createSpritesheet(
                CHARACTER_CONFIG.emotions[emotion].spritesheet,
            ).then((spritesheet) => {
                const emotionConfig = CHARACTER_CONFIG.emotions[emotion];
                emotions[emotion] = {
                    spritesheet,
                    animationContainer: createAnimationContainer(
                        spritesheet,
                        emotionConfig.animations,
                    ),
                    audio: emotionConfig.audio,
                };
            }),
        ),
    );

    const getCurrentCharacterEmotion: Character["getCurrentCharacterEmotion"] =
        () => {
            const emotion = character.mood.emotion;
            return character.emotions[emotion];
        };

    const character: Character = {
        mood: createMood(),
        emotions: emotions as CharacterEmotions,
        getCurrentCharacterEmotion,
    };

    return character;
}
