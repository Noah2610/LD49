import { AudioFileConfig, AudioManagerConfig } from "../audio";

const genFileConfig = (
    name: string,
    opts?: Partial<AudioFileConfig>,
): AudioFileConfig => ({
    name,
    src: require(`../assets/audio/bgm/${name}.ogg`),
    volume: 1.0,
    ...opts,
});

export const AUDIO_CONFIG: AudioManagerConfig = {
    bgm: {
        files: [
            genFileConfig("happy1", { loop: true }),
            genFileConfig("happy2", { loop: true }),
            genFileConfig("sad1", { loop: true }),
            genFileConfig("sad2", { loop: true }),
            genFileConfig("sad3", { loop: true }),
        ],
    },

    sfx: {
        files: [],
    },
};
