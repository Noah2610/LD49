import { AUDIO_CONFIG } from "../config/audio";
import {
    AudioBgm,
    AudioBgmConfig,
    AudioFileConfig,
    AudioManager,
    AudioManagerConfig,
    AudioMap,
    AudioSfx,
    AudioSfxConfig,
} from ".";

export function createAudioManager(): AudioManager {
    const config = AUDIO_CONFIG;

    const bgm = createAudioBgm(config.bgm);
    const sfx = createAudioSfx(config.sfx);

    const manager: AudioManager = {
        bgm,
        sfx,
    };

    return manager;
}

function createAudioBgm(config: AudioBgmConfig): AudioBgm {
    const play: AudioBgm["play"] = (name) => {
        const audio = bgm.audio.get(name);
        if (!audio) {
            console.error(`[bgm.play] Couldn't find audio with name "${name}"`);
            return;
        }
        bgm.stop();
        audio.play();
        bgm.currentlyPlaying = name;
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
        audio.play();
        bgm.currentlyPlaying = name;
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

function createAudioSfx(config: AudioSfxConfig): AudioSfx {
    const play: AudioSfx["play"] = (name: string) => {
        const audio = sfx.audio.get(name);
        if (!audio) {
            console.error(`[sfx.play] Couldn't find audio with name "${name}"`);
            return;
        }
        audio.play();
    };

    const sfx: AudioSfx = {
        audio: createAudioMap(config.files),
        play,
    };

    return sfx;
}

function createAudioMap(configs: AudioFileConfig[]): AudioMap {
    const map: AudioMap = new Map();
    for (const config of configs) {
        map.set(config.name, createAudio(config));
    }
    return map;
}

function createAudio(config: AudioFileConfig): HTMLAudioElement {
    const audio = new Audio(config.src);
    audio.preload = "auto";
    audio.volume = config.volume ?? 1.0;
    audio.loop = !!config.loop;
    return audio;
}
