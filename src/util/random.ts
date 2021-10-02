import { Range } from ".";

/**
 * min is inclusive, max is exclusive.
 */
export function randomBetween(
    min: number,
    max: number,
    asInteger?: boolean,
): number {
    const num = min + Math.random() * (max - min);
    return asInteger ? Math.round(num) : num;
}

export function randomRange(range: Range, asInteger?: boolean): number {
    return randomBetween(range.min, range.max, asInteger);
}
