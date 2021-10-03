import { AnimationContainer } from "../animation";
import { Spritesheet } from "../spritesheet";
import { Emotion, Mood } from "../mood";

export interface Character {
    mood: Mood;
    emotions: CharacterEmotions;

    getCurrentCharacterEmotion(): CharacterEmotion;
}

export type CharacterEmotions = {
    [E in Emotion]: CharacterEmotion;
};

export interface CharacterEmotion {
    spritesheet: Spritesheet;
    animationContainer: AnimationContainer;
    audio: {
        bgm?: string;
        sfx?: string;
    };
}
