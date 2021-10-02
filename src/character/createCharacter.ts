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
                emotions[emotion] = {
                    spritesheet,
                    animationContainer: createAnimationContainer(
                        spritesheet,
                        CHARACTER_CONFIG.emotions[emotion].animations,
                    ),
                };
            }),
        ),
    );

    const character: Character = {
        mood: createMood(),
        emotions: emotions as CharacterEmotions,
    };

    return character;
}
