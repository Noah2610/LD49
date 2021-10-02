import { Timer } from "timesub";
import { Emotion } from "../mood";
import { Character } from "../character";

export interface Context {
    character: Character;

    update?: {
        timer: Timer;
        lastUpdateAt: number;
        lastEmotion?: Emotion;
        lastMoodSwingAt: number;
    };
}
