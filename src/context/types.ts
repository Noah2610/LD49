import { Timer } from "timesub";
import { Emotion } from "../mood";
import { Character } from "../character";
import { Item } from "../item";
import { ActionEmitter } from "../action";
import { AudioManager } from "../audio";

export interface Context {
    character: Character;
    items: Item[];
    actionEmitter: ActionEmitter;
    audio: AudioManager;

    update?: {
        timer: Timer;
        lastUpdateAt: number;
        lastEmotion?: Emotion;
        lastMoodSwingAt: number;
    };
}
