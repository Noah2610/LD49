import { AnimationContainer } from "../animation";
import { Spritesheet } from "../spritesheet";
import { Emotion, Mood } from "../mood";
import { Action } from "../action";

export interface Character {
    mood: Mood;
    emotions: CharacterEmotions;

    getCurrentCharacterEmotion(): CharacterEmotion;
}

export type CharacterEmotions = {
    [E in Emotion]: CharacterEmotion;
};

export interface CharacterEmotion {
    emotion: Emotion;
    spritesheet: Spritesheet;
    animationContainer: AnimationContainer;
    bgm?: string;
    events?: CharacterEmotionEvents;
}

export interface CharacterEmotionEvents {
    enter?: Action;
    leave?: Action;
    random?: Action;
}
