import { randomRange } from "../util";
import { GAME_CONFIG } from "../config/game";
import { Context, expectContext } from "../context";

export function moodSwing(ctx?: Context) {
    ctx = ctx || expectContext();
    const strength = randomRange(GAME_CONFIG.moodSwing.strengthRange);
    ctx.character.mood.setVelocity(strength);
}
