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

    // const dt = (timer.time - (ctx.update.lastUpdateAt ?? 0)) / (1000.0 / UPS);

    updateMood(ctx, timer);
    updateEmotionRandomEvent(ctx, timer);
    updateMoodSwing(ctx, timer);
    updateBgm(ctx, timer);
    updateDifficulty(ctx, timer);

    ctx.update.lastUpdateAt = timer.time;
}

function updateMood(ctx: ContextWithUpdate, timer: Timer) {
    const chr = ctx.character;

    const prevCharEmotion = chr.getCurrentCharacterEmotion();

    chr.mood.update(ctx);

    const charEmotion = chr.getCurrentCharacterEmotion();

    if (ctx.update.lastEmotion !== charEmotion.emotion) {
        if (prevCharEmotion.events?.leave) {
            ctx.actionEmitter.emit(prevCharEmotion.events?.leave);
        }

        const prevAnim =
            prevCharEmotion.animationContainer.getCurrentAnimation();
        if (prevAnim) {
            prevAnim.reset();
        }

        const characterEl = expectEl("#game #character");
        characterEl.innerHTML = "";
        charEmotion.animationContainer.play(EMOTION_ANIMATIONS.idle);
        charEmotion.spritesheet.insertDom(characterEl);

        if (charEmotion.events?.enter) {
            ctx.actionEmitter.emit(charEmotion.events?.enter);
        }

        ctx.update.lastEmotion = chr.mood.emotion;
        ctx.update.lastRandomEventAt = timer.time; // reset on emotion switch
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
    const emotionBgm = ctx.character.getCurrentCharacterEmotion().bgm;
    if (!emotionBgm) return;
    const currentBgm = ctx.audio.bgm.currentlyPlaying;

    if (currentBgm !== emotionBgm) {
        ctx.audio.bgm.switchTo(emotionBgm);
    }
}

function updateEmotionRandomEvent(ctx: ContextWithUpdate, timer: Timer) {
    const timeSinceRandomEvent = timer.time - ctx.update.lastRandomEventAt;

    if (timeSinceRandomEvent > GAME_CONFIG.randomEvent.intervalMs) {
        const charEmotion = ctx.character.getCurrentCharacterEmotion();

        if (charEmotion.events?.random) {
            ctx.actionEmitter.emit(charEmotion.events.random);
        }

        ctx.update.lastRandomEventAt = timer.time;
    }
}

function updateDifficulty(ctx: ContextWithUpdate, timer: Timer) {
    const timeSinceDifficultyIncrease =
        timer.time - ctx.update.lastDifficultyIncreaseAt;
    if (timeSinceDifficultyIncrease > GAME_CONFIG.difficulty.increaseEveryMs) {
        ctx.difficulty += GAME_CONFIG.difficulty.increaseBy;
        ctx.update.lastDifficultyIncreaseAt = timer.time;
    }
}
