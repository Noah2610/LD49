import { createCharacter } from "../character";
import { setupItems } from "../item";
import { createActionEmitter } from "../action";
import { Context } from ".";

export async function createContext(): Promise<Context> {
    const character = await createCharacter();
    const [items, unsubItems] = setupItems();
    const actionEmitter = createActionEmitter();

    const ctx: Context = { character, items, actionEmitter };

    window.CTX = ctx;
    window.onunload = unsubItems;

    return ctx;
}
