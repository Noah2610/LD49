import { AudioFileConfig, AudioManagerConfig } from "../audio";

const genFileConfig = (
    name: string,
    type: "bgm" | "sfx",
    opts?: Partial<AudioFileConfig>,
): AudioFileConfig => ({
    name,
    src: require(`../assets/audio/${type}/${name}.ogg`),
    ...opts,
});

const genBgm = (
    name: string,
    opts?: Partial<AudioFileConfig>,
): AudioFileConfig =>
    genFileConfig(name, "bgm", {
        volume: 1.0,
        loop: true,
        ...opts,
    });

const genSfx = (
    name: string,
    opts?: Partial<AudioFileConfig>,
): AudioFileConfig =>
    genFileConfig(name, "sfx", {
        volume: 1.0,
        loop: false,
        ...opts,
    });

export const AUDIO_CONFIG: AudioManagerConfig = {
    bgm: {
        files: [
            genBgm("suicidal"),
            genBgm("depressed"),
            genBgm("sad"),
            genBgm("calm"),
            genBgm("happy"),
            genBgm("excited"),
            genBgm("manic"),
        ],
    },

    sfx: {
        files: [
            genSfx("crying"),
            genSfx("text-happy2"),
            genSfx("text-happy1"),
            genSfx("text-manic1"),
            genSfx("text-manic2"),
            genSfx("text-manic3"),
            genSfx("text-calm1"),
            genSfx("randomclick"),
            genSfx("text-sad1"),
            genSfx("text-sad2"),
            genSfx("text-suicidal1"),
            genSfx("syringe"),
            genSfx("scarydeathsound"),
            genSfx("vomit"),
            genSfx("explosion"),
        ],
    },
};
