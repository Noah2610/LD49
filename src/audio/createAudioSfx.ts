import { AudioSfx, AudioSfxConfig } from ".";
import { createAudioMap } from "./util";

export function createAudioSfx(config: AudioSfxConfig): AudioSfx {
    const play: AudioSfx["play"] = (name: string) => {
        const audio = sfx.audio.get(name);
        if (!audio) {
            console.error(`[sfx.play] Couldn't find audio with name "${name}"`);
            return;
        }
        audio.currentTime = 0;
        audio.play();
    };

    const pause: AudioSfx["pause"] = (name: string) => {
        const audio = sfx.audio.get(name);
        if (!audio) {
            console.error(
                `[sfx.pause] Couldn't find audio with name "${name}"`,
            );
            return;
        }
        audio.pause();
        audio.currentTime = 0;
    };

    const sfx: AudioSfx = {
        audio: createAudioMap(config.files),
        play,
        pause,
    };

    return sfx;
}
