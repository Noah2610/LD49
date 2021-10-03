import { createCharacter } from "../character";
import { setupItems } from "../item";
import { createActionEmitter } from "../action";
import { Context } from ".";

export async function createContext(): Promise<Context> {
    const cleanups: (() => void)[] = [];

    const character = await createCharacter();
    const [items, unsubItems] = setupItems();
    cleanups.push(unsubItems);
    const actionEmitter = createActionEmitter();
    cleanups.push(actionEmitter.reset);

    const ctx: Context = { character, items, actionEmitter };

    window.CTX = ctx;
    window.onunload = () => cleanups.forEach((cb) => cb());

    return ctx;
}
