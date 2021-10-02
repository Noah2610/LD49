import { createTimer } from "timesub";
import { Context, expectContext } from "../context";
import { expectEl } from "../util";
import { update, UPS } from ".";

export function startGame() {
    const characterEl = expectEl("#game #character");
    characterEl.innerHTML = "";

    const ctx = expectContext();

    startUpdateLoop(ctx);
}

function startUpdateLoop(ctx: Context) {
    const delayMs = 1000.0 / UPS;

    stopGameLoop(ctx);

    ctx.updateTimer = createTimer({
        duration: "infinite",
        updateInterval: delayMs,
    });
    ctx.updateTimer.on("update", (timer) => update(ctx, timer));
    ctx.updateTimer.play();
}

function stopGameLoop(ctx: Context) {
    if (ctx.updateTimer) {
        ctx.updateTimer.pause();
        delete ctx.updateTimer;
    }
}
