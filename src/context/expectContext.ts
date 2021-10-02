import { Context } from ".";

export function expectContext(): Context {
    const ctx = window.CTX;
    if (!ctx) {
        throw new Error(`[expectContext] Expected context object on window`);
    }
    return ctx;
}
