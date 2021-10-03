import { randomRange } from "../util";
import { Context } from "../context";
import { ActionEmitter } from ".";

export function setupActionConsumer(ctx: Context): () => void {
    const emitter = ctx.actionEmitter;

    const unsubs: (() => void)[] = [];

    const listen: ActionEmitter["on"] = (type, cb) => {
        const unsub = emitter.on(type, cb);
        unsubs.push(unsub);
        return unsub;
    };

    listen("Actions", (action) => {
        action.actions.forEach((a) => emitter.emit(a));
    });

    listen("Debug", (action) => {
        console.log(`[Debug] ${action.message}`);
    });

    listen("MoodChange", (action) => {
        ctx.character.mood.addVelocity(randomRange(action.velocity));
    });

    listen("PlaySfx", (action) => {
        ctx.audio.sfx.play(action.sfx);
    });

    return () => unsubs.forEach((cb) => cb());
}
