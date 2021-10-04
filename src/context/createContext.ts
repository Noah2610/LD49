import { createCharacter } from "../character";
import { setupItems } from "../item";
import { createActionEmitter, setupActionConsumer } from "../action";
import { createAudioManager } from "../audio";
import { createTextbox } from "../textbox";
import { Context } from ".";

export function createContext(): Context {
    const cleanups: (() => void)[] = [];

    const character = createCharacter();
    const [items, unsubItems] = setupItems();
    cleanups.push(unsubItems);
    const actionEmitter = createActionEmitter();
    cleanups.push(actionEmitter.reset);
    const audio = createAudioManager();
    const textbox = createTextbox();

    const ctx: Context = {
        character,
        items,
        actionEmitter,
        audio,
        textbox,
        difficulty: 1.0,
        isGameOver: false,
    };
    window.CTX = ctx;

    const _cleanupActionConsumer = setupActionConsumer(ctx);

    window.onunload = () => cleanups.forEach((cb) => cb());

    return ctx;
}
