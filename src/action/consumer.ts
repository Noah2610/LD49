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

    listen("Debug", (action) => {
        console.log(`[Debug] ${action.message}`);
    });

    listen("MoodChange", (action) => {
        ctx.character.mood.addVelocity(randomRange(action.velocity));
    });

    listen("Actions", (action) => {
        action.actions.forEach((a) => emitter.emit(a));
    });

    return () => unsubs.forEach((cb) => cb());
}
