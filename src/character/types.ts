import { AnimationContainer } from "../animation";
import { Spritesheet } from "../spritesheet";
import { Emotion, Mood } from "../mood";

export interface Character {
    mood: Mood;
    emotions: CharacterEmotions;
}

export type CharacterEmotions = {
    [E in Emotion]: CharacterEmotion;
};

export interface CharacterEmotion {
    spritesheet: Spritesheet;
    animationContainer: AnimationContainer;
}
