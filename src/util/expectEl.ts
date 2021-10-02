export function expectEl<E extends Element = HTMLElement>(
    query: string,
    root: Element | Document = document,
): E {
    const el = root.querySelector<E>(query);
    if (!el) {
        throw new Error(`Couldn't find element with query "${query}"`);
    }
    return el;
}

export function expectEls<E extends Element = HTMLElement>(
    query: string,
    root: Element | Document = document,
): E[] {
    return Array.from(root.querySelectorAll<E>(query));
}
