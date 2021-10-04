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

        // if (config.sfx) {
        //     const ctx = expectContext();
        //     if (ctx.audio.sfx.audio.has(config.sfx)) {
        //         ctx.audio.sfx.play(config.sfx);
        //     }
        // }
    };

    const updateSfx = (config: TextboxConfig) => {
        if (!config.sfx) return;
        const part = textbox.parts[0];
        if (!part) return;

        const ctx = expectContext();
        if (ctx.audio.sfx.audio.has(config.sfx)) {
            ctx.audio.sfx.play(config.sfx);
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

        const charTimer = createTimer({
            duration: (chars.length + 2) * opts.charDelayMs,
            updateInterval: opts.charDelayMs,
        });

        charTimer.on("update", () => updateTextbox(opts));
        charTimer.on("finish", () => {
            // updateTextbox(opts);
            const [part] = textbox.parts.splice(0, 1);

            if (part) {
                part.sfxTimer.reset();
            }

            const nextPart = textbox.parts[0];
            if (nextPart) {
                nextPart.charTimer.play();
                nextPart.sfxTimer.play();
                updateSfx(opts);
            }
        });

        const sfxTimer = createTimer({
            duration: "infinite",
            updateInterval: opts.sfxDelayMs,
        });

        sfxTimer.on("update", () => updateSfx(opts));

        const part: TextboxPart = {
            chars,
            charTimer,
            sfxTimer,
            partEl,
        };

        textbox.parts.push(part);

        if (textbox.parts.length === 1) {
            charTimer.play();
            sfxTimer.play();
            updateSfx(opts);
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
