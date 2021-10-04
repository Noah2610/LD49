import { createTimer } from "timesub";
import { Context, expectContext } from "../context";
import { expectEl } from "../util";
import { GAME_CONFIG } from "../config/game";
import { update } from ".";

const UPS = GAME_CONFIG.ups;

export function startGame() {
    const characterEl = expectEl("#game #character");
    characterEl.innerHTML = "";

    const ctx = expectContext();

    startUpdateLoop(ctx);
}

function startUpdateLoop(ctx: Context) {
    const delayMs = 1000.0 / UPS;

    stopGameLoop(ctx);

    ctx.update = {
        timer: createTimer({
            duration: "infinite",
            updateInterval: delayMs,
        }),
        lastUpdateAt: 0,
        lastEmotion: undefined,
        lastMoodSwingAt: 0,
        lastRandomEventAt: 0,
        lastDifficultyIncreaseAt: 0,
    };

    ctx.update.timer.on("update", (timer) => update(ctx, timer));
    ctx.update.timer.play();
}

function stopGameLoop(ctx: Context) {
    if (ctx.update) {
        ctx.update.timer.pause();
        delete ctx.update;
    }
}
