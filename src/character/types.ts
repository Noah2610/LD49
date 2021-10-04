import { AnimationContainer } from "../animation";
import { Spritesheet } from "../spritesheet";
import { Emotion, Mood } from "../mood";
import { Action } from "../action";
import { Pos } from "../util";

export interface Character {
    mood: Mood;
    emotions: CharacterEmotions;
    gameOver: CharacterGameOver;

    getCurrentCharacterEmotion(): CharacterEmotion;
}

export type CharacterEmotions = {
    [E in Emotion]: CharacterEmotion;
};

export interface CharacterEmotion extends CharacterPresentation {
    emotion: Emotion;
    events?: CharacterEmotionEvents;
}

export interface CharacterGameOver {
    Suicidal: CharacterPresentation;
    Manic: CharacterPresentation;
}

export interface CharacterPresentation {
    spritesheet: Spritesheet;
    animationContainer: AnimationContainer;
    bgm?: string;
    posOffset?: Pos;
}

export interface CharacterEmotionEvents {
    enter?: Action;
    leave?: Action;
    random?: Action;
}
