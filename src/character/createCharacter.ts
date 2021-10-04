import { createAnimationContainer } from "../animation/createAnimationContainer";
import { createSpritesheet } from "../spritesheet";
import { createMood, EMOTIONS } from "../mood";
import {
    CharacterPresentationConfig,
    CHARACTER_CONFIG,
} from "../config/character";
import { Character, CharacterEmotions, CharacterPresentation } from ".";

export function createCharacter(): Character {
    const emotions: Partial<CharacterEmotions> = {};

    EMOTIONS.forEach((emotion) => {
        emotions[emotion] = {
            ...genCharacterPresentationFromConfig(
                CHARACTER_CONFIG.emotions[emotion],
            ),
            emotion,
        };
    });

    const gameOver: Character["gameOver"] = {
        Suicidal: genCharacterPresentationFromConfig(
            CHARACTER_CONFIG.gameOver.Suicidal,
        ),
        Manic: genCharacterPresentationFromConfig(
            CHARACTER_CONFIG.gameOver.Manic,
        ),
    };

    const getCurrentCharacterEmotion: Character["getCurrentCharacterEmotion"] =
        () => {
            const emotion = character.mood.emotion;
            return character.emotions[emotion];
        };

    const character: Character = {
        mood: createMood(),
        emotions: emotions as CharacterEmotions,
        gameOver,
        getCurrentCharacterEmotion,
    };

    return character;
}

function genCharacterPresentationFromConfig(
    config: CharacterPresentationConfig,
): CharacterPresentation {
    const spritesheet = createSpritesheet(config.spritesheet);
    const animationContainer = createAnimationContainer(
        spritesheet,
        config.animations,
    );
    return {
        spritesheet,
        animationContainer,
        bgm: config.bgm,
        events: config.events,
        posOffset: config.posOffset,
    };
}
