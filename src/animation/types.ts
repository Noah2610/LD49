import { SpriteIdx, Spritesheet } from "../spritesheet";

export interface Animation {
    spritesheet: Spritesheet;
    frames: AnimationFrame[];
    shouldLoop: boolean;
    currentFrameIdx: number;
    playingState: AnimationPlayingState;

    isPlaying(): boolean;
    play(): void;
    pause(): void;
    reset(): void;
}

export interface AnimationFrame {
    idx: SpriteIdx;
    durationMs: number;
}

export type AnimationPlayingState =
    | { isPlaying: false }
    | { isPlaying: true; timeout: NodeJS.Timeout };

export interface AnimationConfig {
    frames: AnimationConfigFrame[];
    loop: boolean;
}

export type AnimationConfigFrame = [SpriteIdx, number];
