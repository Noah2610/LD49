import { pick, randomRange } from "../util";
import { Context } from "../context";
import { spawnSpeechBubble } from "../speechBubble";
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

    listen("Random", (action) => {
        if (action.actions.length === 0) return;
        emitter.emit(pick(action.actions)!);
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

    listen("AddText", (action) => {
        const text = "text" in action ? action.text : pick(action.randomText);
        if (!text) return;
        ctx.textbox.scroll.add(text, action.config);
    });

    listen("SpawnSpeechBubble", (action) => {
        const text = "text" in action ? action.text : pick(action.randomText);
        if (!text) return;
        spawnSpeechBubble(text, action.options);
    });

    return () => unsubs.forEach((cb) => cb());
}
