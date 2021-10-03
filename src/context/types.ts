import { Timer } from "timesub";
import { Emotion } from "../mood";
import { Character } from "../character";
import { Item } from "../item";
import { ActionEmitter } from "../action";

export interface Context {
    character: Character;
    items: Item[];
    actionEmitter: ActionEmitter;

    update?: {
        timer: Timer;
        lastUpdateAt: number;
        lastEmotion?: Emotion;
        lastMoodSwingAt: number;
    };
}
