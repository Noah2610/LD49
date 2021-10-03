import { Timer } from "timesub";

export interface Textbox {
    rootEl: HTMLElement;
    config: TextboxConfig;
    parts: TextboxPart[];

    add(text: string, options?: Partial<TextboxConfig>): void;
}

export interface TextboxPart {
    chars: string[];
    timer: Timer;
    partEl: HTMLElement;
}

export interface TextboxConfig {
    delayMs: number;
    sfx?: string;
    updatePartEl?(partEl: HTMLElement): HTMLElement;
}
