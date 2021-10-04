import { createAnimationContainer } from "../animation/createAnimationContainer";
import { createSpritesheet } from "../spritesheet";
import { createMood, EMOTIONS } from "../mood";
import { CHARACTER_CONFIG } from "../config/character";
import { Character, CharacterEmotions } from ".";

export function createCharacter(): Character {
    const emotions: Partial<CharacterEmotions> = {};

    EMOTIONS.forEach((emotion) => {
        const spritesheet = createSpritesheet(
            CHARACTER_CONFIG.emotions[emotion].spritesheet,
        );
        const emotionConfig = CHARACTER_CONFIG.emotions[emotion];
        emotions[emotion] = {
            emotion,
            spritesheet,
            animationContainer: createAnimationContainer(
                spritesheet,
                emotionConfig.animations,
            ),
            bgm: emotionConfig.bgm,
            events: emotionConfig.events,
        };
    });

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
