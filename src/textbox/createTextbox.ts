import { createTimer } from "timesub";
import { TEXTBOX_CONFIG } from "../config/textbox";
import { expectEl } from "../util";
import { expectContext } from "../context";
import { Textbox, TextboxConfig, TextboxPart } from ".";

export function createTextbox(): Textbox {
    const rootEl = expectEl("#game #textbox");
    const config = TEXTBOX_CONFIG;

    const updateTextbox = (config: TextboxConfig) => {
        const part = textbox.parts[0];
        if (!part) return;

        const [chr] = part.chars.splice(0, 1);
        if (chr === undefined) return;

        part.partEl.innerHTML += chr;
        part.partEl.scrollIntoView(false);

        if (config.sfx) {
            const ctx = expectContext();
            if (ctx.audio.sfx.audio.has(config.sfx)) {
                ctx.audio.sfx.play(config.sfx);
            }
        }
    };

    const add: Textbox["add"] = (text, options) => {
        const opts = {
            ...textbox.config,
            ...options,
        };

        const chars = text.split("");

        let partEl: HTMLElement = document.createElement("div");
        partEl.classList.add("textbox__part");

        if (opts.updatePartEl) {
            partEl = opts.updatePartEl(partEl);
        }

        textbox.rootEl.appendChild(partEl);

        const timer = createTimer({
            duration: chars.length * opts.delayMs,
            updateInterval: opts.delayMs,
        });

        timer.on("update", () => updateTextbox(opts));
        timer.on("finish", () => {
            updateTextbox(opts);
            textbox.parts.splice(0, 1);

            const nextPart = textbox.parts[0];
            if (nextPart) {
                nextPart.timer.play();
            }
        });

        const part: TextboxPart = {
            chars,
            timer,
            partEl,
        };

        textbox.parts.push(part);

        if (textbox.parts.length === 1) {
            timer.play();
        }
    };

    const textbox: Textbox = {
        rootEl,
        parts: [],
        config,
        add,
    };

    return textbox;
}
