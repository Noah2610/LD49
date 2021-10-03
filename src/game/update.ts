import { Timer } from "timesub";
import { Context } from "../context";
import { expectEl } from "../util";
import { GAME_CONFIG } from "../config/game";
import { moodSwing } from ".";

const UPS = GAME_CONFIG.ups;

const EMOTION_ANIMATIONS = {
    idle: "idle",
};

type ContextWithUpdate = Context & Required<Pick<Context, "update">>;

function isContextWithUpdate(ctx: Context): ctx is ContextWithUpdate {
    return !!ctx.update;
}

export function update(ctx: Context, timer: Timer) {
    if (!isContextWithUpdate(ctx)) {
        console.error(
            "[update] window.CTX.update should exist before update() call",
        );
        return;
    }

    const dt = (timer.time - (ctx.update.lastUpdateAt ?? 0)) / (1000.0 / UPS);

    updateMood(ctx, timer, dt);
    updateMoodSwing(ctx, timer);
    updateBgm(ctx, timer);

    ctx.update.lastUpdateAt = timer.time;
}

function updateMood(ctx: ContextWithUpdate, timer: Timer, dt: number) {
    const chr = ctx.character;

    const prevCharEmotion = chr.getCurrentCharacterEmotion();

    chr.mood.update(dt);

    const charEmotion = chr.getCurrentCharacterEmotion();

    if (ctx.update.lastEmotion !== charEmotion.emotion) {
        const prevAnim =
            prevCharEmotion.animationContainer.getCurrentAnimation();
        if (prevAnim) {
            prevAnim.reset();
        }

        const characterEl = expectEl("#game #character");
        characterEl.innerHTML = "";
        charEmotion.animationContainer.play(EMOTION_ANIMATIONS.idle);
        charEmotion.spritesheet.insertDom(characterEl);

        ctx.update.lastEmotion = chr.mood.emotion;
    }
}

function updateMoodSwing(ctx: ContextWithUpdate, timer: Timer) {
    if (
        timer.time >
        ctx.update.lastMoodSwingAt + GAME_CONFIG.moodSwing.intervalMs
    ) {
        moodSwing(ctx);
        ctx.update.lastMoodSwingAt = timer.time;
    }
}

function updateBgm(ctx: ContextWithUpdate, timer: Timer) {
    const emotionBgm = ctx.character.getCurrentCharacterEmotion().audio.bgm;
    if (!emotionBgm) return;
    const currentBgm = ctx.audio.bgm.currentlyPlaying;

    if (currentBgm !== emotionBgm) {
        ctx.audio.bgm.switchTo(emotionBgm);
    }
}
