import { createCharacter } from "../character";
import { setupItems } from "../item";
import { createActionEmitter, setupActionConsumer } from "../action";
import { createAudioManager } from "../audio";
import { Context } from ".";

export async function createContext(): Promise<Context> {
    const cleanups: (() => void)[] = [];

    const character = await createCharacter();
    const [items, unsubItems] = setupItems();
    cleanups.push(unsubItems);
    const actionEmitter = createActionEmitter();
    cleanups.push(actionEmitter.reset);
    const audio = createAudioManager();

    const ctx: Context = {
        character,
        items,
        actionEmitter,
        audio,
    };
    window.CTX = ctx;

    const _cleanupActionConsumer = setupActionConsumer(ctx);

    window.onunload = () => cleanups.forEach((cb) => cb());

    return ctx;
}
