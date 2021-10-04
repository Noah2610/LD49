import { Timer } from "timesub";
import { Emotion } from "../mood";
import { Character } from "../character";
import { Item } from "../item";
import { ActionEmitter } from "../action";
import { AudioManager } from "../audio";
import { Textbox } from "../textbox";

export interface Context {
    character: Character;
    items: Item[];
    actionEmitter: ActionEmitter;
    audio: AudioManager;
    textbox: Textbox;
    difficulty: number;

    update?: {
        timer: Timer;
        lastUpdateAt: number;
        lastEmotion?: Emotion;
        lastMoodSwingAt: number;
        lastRandomEventAt: number;
        lastDifficultyIncreaseAt: number;
    };
}
