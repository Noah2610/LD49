import { Timer } from "timesub";
import { Emotion } from "../mood";
import { Character } from "../character";
import { Item } from "../item";

export interface Context {
    character: Character;
    items: Item[];

    update?: {
        timer: Timer;
        lastUpdateAt: number;
        lastEmotion?: Emotion;
        lastMoodSwingAt: number;
    };
}
