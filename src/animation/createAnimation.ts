import { Animation, AnimationConfig, AnimationFrame } from ".";
import { Spritesheet } from "../spritesheet";

export function createAnimation(
    spritesheet: Spritesheet,
    config: AnimationConfig,
): Animation {
    const frames: AnimationFrame[] = config.frames.map((configFrame) => ({
        idx: configFrame[0],
        durationMs: configFrame[1],
    }));

    const updateFrame = () => {
        const frame = animation.frames[animation.currentFrameIdx];
        if (frame) {
            animation.spritesheet.showSprite(frame.idx);
        }
    };

    const play: Animation["play"] = () => {
        const showFrame = (frameIdx: number) => {
            if (frameIdx >= animation.frames.length) {
                if (animation.shouldLoop) {
                    frameIdx = 0;
                } else {
                    animation.pause();
                    return;
                }
            }
            const frame = animation.frames[frameIdx];
            if (!frame) {
                console.error(
                    `[animation.play] Frame at index ${frameIdx} doesn't exist`,
                );
                return;
            }
            animation.currentFrameIdx = frameIdx;
            animation.spritesheet.showSprite(frame.idx);
            animation.playingState = {
                isPlaying: true,
                timeout: setTimeout(
                    () => showFrame(frameIdx + 1),
                    frame.durationMs,
                ),
            };
        };

        showFrame(animation.currentFrameIdx);
    };

    const pause: Animation["pause"] = () => {
        if (animation.playingState.isPlaying) {
            clearTimeout(animation.playingState.timeout);
            animation.playingState = {
                isPlaying: false,
            };
        }
    };

    const reset: Animation["reset"] = () => {
        animation.pause();
        animation.currentFrameIdx = 0;
        updateFrame();
    };

    const isPlaying: Animation["isPlaying"] = () =>
        animation.playingState.isPlaying;

    const animation: Animation = {
        spritesheet,
        frames,
        shouldLoop: config.loop,
        currentFrameIdx: 0,
        playingState: { isPlaying: false },

        isPlaying,
        play,
        pause,
        reset,
    };

    return animation;
}
