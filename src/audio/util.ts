import { AudioFileConfig, AudioMap } from ".";

export function createAudioMap(configs: AudioFileConfig[]): AudioMap {
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
    audio.playbackRate = config.playbackRate ?? 1.0;
    return audio;
}
