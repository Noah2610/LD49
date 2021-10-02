import { randomRange } from "../util";
import { GAME_CONFIG } from "../config/game";
import { Context, expectContext } from "../context";

export function moodSwing(ctx?: Context) {
    ctx = ctx || expectContext();

    let strength = randomRange(GAME_CONFIG.moodSwing.strengthRange);

    if (Math.random() < 0.5) {
        strength *= -1;
    }

    console.log(`MOOD SWING ${strength}`);

    ctx.character.mood.addVelocity(strength);
}
