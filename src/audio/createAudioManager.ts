import { AUDIO_CONFIG } from "../config/audio";
import { AudioManager, createAudioBgm, createAudioSfx } from ".";

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
