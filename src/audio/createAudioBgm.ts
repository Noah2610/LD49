import { AudioBgm, AudioBgmConfig } from ".";
import { createAudioMap } from "./util";

export function createAudioBgm(config: AudioBgmConfig): AudioBgm {
    const play: AudioBgm["play"] = (name) => {
        const audio = bgm.audio.get(name);
        if (!audio) {
            console.error(`[bgm.play] Couldn't find audio with name "${name}"`);
            return;
        }
        bgm.stop();
        audio.currentTime = 0;
        audio.play().then(
            () => (bgm.currentlyPlaying = name),
            () =>
                console.error(
                    `[bgm.play] Couldn't play audio, user probably hasn't interacted with page yet`,
                ),
        );
    };

    const stop: AudioBgm["stop"] = () => {
        const name = bgm.currentlyPlaying;
        if (!name) return;
        const audio = bgm.audio.get(name);
        if (!audio) return;
        audio.pause();
        audio.currentTime = 0;
        bgm.currentlyPlaying = undefined;
    };

    const switchTo: AudioBgm["switchTo"] = (name) => {
        const audio = bgm.audio.get(name);
        if (!audio) {
            console.error(
                `[bgm.switchTo] Couldn't find audio with name "${name}"`,
            );
            return;
        }

        const currentTime = bgm.getCurrentlyPlaying()?.currentTime ?? 0;
        bgm.stop();
        audio.currentTime = currentTime;
        audio.play().then(
            () => (bgm.currentlyPlaying = name),
            () =>
                console.error(
                    `[bgm.switchTo] Couldn't play audio, user probably hasn't interacted with page yet`,
                ),
        );
    };

    const getCurrentlyPlaying: AudioBgm["getCurrentlyPlaying"] = () => {
        const current = bgm.currentlyPlaying;
        if (!current) return null;
        return bgm.audio.get(current) || null;
    };

    const bgm: AudioBgm = {
        audio: createAudioMap(config.files),
        currentlyPlaying: undefined,
        play,
        stop,
        switchTo,
        getCurrentlyPlaying,
    };

    return bgm;
}
