import { ActionEmitter } from ".";
import { Context } from "../context";

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
        ctx.character.mood.addVelocity(action.velocity);
    });

    return () => unsubs.forEach((cb) => cb());
}
