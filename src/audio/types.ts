export interface AudioManager {
    bgm: AudioBgm;
    sfx: AudioSfx;
}

export interface AudioBgm {
    audio: AudioMap;
    currentlyPlaying?: string;

    play(name: string): void;
    stop(): void;
    switchTo(name: string): void;
    getCurrentlyPlaying(): HTMLAudioElement | null;
}

export interface AudioSfx {
    audio: AudioMap;

    play(name: string): void;
    pause(name: string): void;
}

export type AudioMap = Map<string, HTMLAudioElement>;

export interface AudioManagerConfig {
    bgm: AudioBgmConfig;
    sfx: AudioSfxConfig;
}

export interface AudioBgmConfig {
    files: AudioFileConfig[];
}

export interface AudioSfxConfig {
    files: AudioFileConfig[];
}

export interface AudioFileConfig {
    name: string;
    src: string;
    volume?: number;
    loop?: boolean;
    playbackRate?: number;
}
