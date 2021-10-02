import { Timer } from "timesub";
import { Emotion } from "../mood";
import { Character } from "../character";

export interface Context {
    character: Character;

    updateTimer?: Timer;
    lastUpdateAt?: number;
    lastEmotion?: Emotion;
}
