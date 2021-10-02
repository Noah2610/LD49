import { createCharacter } from "../character";
import { Context } from ".";

export async function createContext(): Promise<Context> {
    const character = await createCharacter();
    const ctx: Context = { character };
    window.CTX = ctx;
    return ctx;
}
