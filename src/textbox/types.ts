import { Timer } from "timesub";

export interface Textbox {
    rootEl: HTMLElement;
    config: TextboxConfig;
    parts: TextboxPart[];

    add(text: string, options?: Partial<TextboxConfig>): void;
}

export interface TextboxPart {
    chars: string[];
    charTimer: Timer;
    sfxTimer: Timer;
    partEl: HTMLElement;
}

export interface TextboxConfig {
    charDelayMs: number;
    sfxDelayMs: number;
    sfx?: string;
    updatePartEl?(partEl: HTMLElement): HTMLElement;
}
