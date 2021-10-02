import { Timer } from "timesub";
import { Context } from "../context";
import { expectEl } from "../util";
import { UPS } from ".";

export function update(ctx: Context, timer: Timer) {
    const dt = (timer.time - (ctx.lastUpdateAt ?? 0)) / (1000.0 / UPS);

    const chr = ctx.character;

    chr.mood.update(dt);

    const emotionChar = chr.getCurrentCharacterEmotion();

    if (ctx.lastEmotion !== chr.mood.emotion) {
        const characterEl = expectEl("#game #character");
        characterEl.innerHTML = "";
        emotionChar.spritesheet.insertDom(characterEl);
        ctx.lastEmotion = chr.mood.emotion;
    }

    ctx.lastUpdateAt = timer.time;
}
