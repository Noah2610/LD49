export function shuffle<T>(arr: T[] | readonly T[]): T[] {
    const shuffled = [...arr];
    for (let i = 0; i < arr.length; i++) {
        const j = Math.floor(Math.random() * arr.length);
        const tmp = shuffled[i]!;
        shuffled[i] = shuffled[j]!;
        shuffled[j] = tmp;
    }
    return shuffled;
}
