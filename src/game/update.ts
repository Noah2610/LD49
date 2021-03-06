import { Timer } from "timesub";
import { Context } from "../context";
import { expectEl, pick } from "../util";
import { GAME_CONFIG } from "../config/game";
import { MOOD_RANGE } from "../config/mood";
import { moodSwing } from ".";
import { CharacterPresentation } from "../character";

const UPS = GAME_CONFIG.ups;

const ANIMATION_NAMES = {
    gameOver: "gameOver",
} as const;

type ContextWithUpdate = Context & Required<Pick<Context, "update">>;

function isContextWithUpdate(ctx: Context): ctx is ContextWithUpdate {
    return !!ctx.update;
}

export function update(ctx: Context, timer: Timer) {
    if (ctx.isGameOver) {
        return;
    }

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
    updateGameOver(ctx, timer);

    ctx.update.lastUpdateAt = timer.time;
}

function updateMood(ctx: ContextWithUpdate, timer: Timer) {
    const chr = ctx.character;

    const prevCharEmotion = chr.getCurrentCharacterEmotion();

    chr.mood.update(ctx);

    const charEmotion = chr.getCurrentCharacterEmotion();

    if (ctx.update.lastEmotion !== charEmotion.emotion) {
        switchCharacterPresentation(ctx, charEmotion, prevCharEmotion);

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

function updateGameOver(ctx: ContextWithUpdate, timer: Timer) {
    const mood = ctx.character.mood.value;

    if (mood >= MOOD_RANGE.max) {
        gameOver(ctx, "Manic");
    } else if (mood <= MOOD_RANGE.min) {
        gameOver(ctx, "Suicidal");
    }
}

function gameOver(ctx: ContextWithUpdate, type: "Suicidal" | "Manic") {
    const prevPres = ctx.character.getCurrentCharacterEmotion();
    const nextPres = ctx.character.gameOver[type];
    switchCharacterPresentation(ctx, nextPres, prevPres);
    if (nextPres.animationContainer.animations.has(ANIMATION_NAMES.gameOver)) {
        nextPres.animationContainer.play(ANIMATION_NAMES.gameOver);
    }

    ctx.audio.bgm.stop();

    ctx.isGameOver = true;
    ctx.update.timer.reset();

    const resetBtnEl = document.querySelector("#reset-btn-wrapper");
    if (resetBtnEl) {
        resetBtnEl.classList.add("reset-btn-wrapper--active");
    }
}

function switchCharacterPresentation(
    ctx: Context,
    pres: CharacterPresentation,
    prevPres: CharacterPresentation,
) {
    if (prevPres.events?.leave) {
        ctx.actionEmitter.emit(prevPres.events?.leave);
    }

    const prevAnim = prevPres.animationContainer.getCurrentAnimation();
    if (prevAnim) {
        prevAnim.reset();
    }

    const characterEl = expectEl("#game #character");
    characterEl.innerHTML = "";
    const animName = pick(
        Array.from(pres.animationContainer.animations.keys()),
    );
    if (animName) {
        pres.animationContainer.play(animName);
    }

    const wrapperEl = pres.spritesheet.wrapperEl;
    if (wrapperEl) {
        wrapperEl.style.transform = pres.posOffset
            ? `translate(${pres.posOffset.x}px, ${pres.posOffset.y}px)`
            : "none";
    }

    pres.spritesheet.insertDom(characterEl);

    if (pres.events?.enter) {
        ctx.actionEmitter.emit(pres.events?.enter);
    }
}
