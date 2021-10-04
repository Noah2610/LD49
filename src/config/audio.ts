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
        volume: 0.5,
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
            genBgm("happy1"),
            genBgm("happy2"),
            genBgm("sad1"),
            genBgm("sad2"),
            genBgm("sad3"),
        ],
    },

    sfx: {
        files: [
            genSfx("crying"),
            genSfx("happy2speech", { name: "text-happy2" }),
            genSfx("happyspeech", { name: "text-happy1" }),
            genSfx("manicspeech1", { name: "text-manic1" }),
            genSfx("manicspeech2", { name: "text-manic2" }),
            genSfx("manicspeech3", { name: "text-manic3" }),
            genSfx("neutralspeech", { name: "text-calm1" }),
            genSfx("randomclick"),
            genSfx("sad1speech", { name: "text-sad1" }),
            genSfx("sad2speech", { name: "text-sad2" }),
            genSfx("suicidalspeech", { name: "text-suicidal1" }),
            genSfx("syringe"),
        ],
    },
};
