import { Timer } from "timesub";

export interface Textbox {
    scroll: TextScroll;
}

export interface TextScroll {
    rootEl: HTMLElement;
    config: TextScrollConfig;
    parts: TextScrollPart[];

    add(text: string, options?: Partial<TextScrollConfig>): void;
}

export interface TextScrollPart {
    chars: string[];
    charTimer: Timer;
    sfxTimer: Timer;
    partEl: HTMLElement;
    config: TextScrollConfig;
}

export interface TextScrollConfig {
    charDelayMs: number;
    sfxDelayMs: number;
    sfx?: string | string[];
    updatePartEl?(partEl: HTMLElement): HTMLElement;
}
