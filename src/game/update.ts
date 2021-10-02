import { Timer } from "timesub";
import { Context } from "../context";
import { expectEl } from "../util";
import { UPS } from ".";

export function update(ctx: Context, timer: Timer) {
    if (!ctx.update) {
        console.error(
            "[update] window.CTX.update should exist before update() call",
        );
        return;
    }

    const dt = (timer.time - (ctx.update.lastUpdateAt ?? 0)) / (1000.0 / UPS);

    const chr = ctx.character;

    chr.mood.update(dt);

    const emotionChar = chr.getCurrentCharacterEmotion();

    if (ctx.update.lastEmotion !== chr.mood.emotion) {
        const characterEl = expectEl("#game #character");
        characterEl.innerHTML = "";
        emotionChar.spritesheet.insertDom(characterEl);
        ctx.update.lastEmotion = chr.mood.emotion;
    }

    ctx.update.lastUpdateAt = timer.time;
}
