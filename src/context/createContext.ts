import { createCharacter } from "../character";
import { setupItems } from "../item";
import { Context } from ".";

export async function createContext(): Promise<Context> {
    const character = await createCharacter();
    const [items, unsubItems] = setupItems();
    const ctx: Context = { character, items };
    window.CTX = ctx;
    window.onunload = unsubItems;
    return ctx;
}
