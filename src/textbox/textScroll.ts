import { createTimer } from "timesub";
import { expectContext } from "../context";
import { TextScroll, TextScrollConfig, TextScrollPart } from ".";

export function createTextScroll(
    rootEl: HTMLElement,
    config: TextScrollConfig,
): TextScroll {
    const updateTextbox = (config: TextScrollConfig) => {
        const part = textScroll.parts[0];
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

    const updateSfx = (config: TextScrollConfig) => {
        if (!config.sfx) return;
        const part = textScroll.parts[0];
        if (!part) return;

        const ctx = expectContext();
        if (ctx.audio.sfx.audio.has(config.sfx)) {
            ctx.audio.sfx.play(config.sfx);
        }
    };

    const add: TextScroll["add"] = (text, options) => {
        const opts = {
            ...textScroll.config,
            ...options,
        };

        const chars = text.split("");

        let partEl: HTMLElement = document.createElement("div");
        partEl.classList.add("textbox__part");

        if (opts.updatePartEl) {
            partEl = opts.updatePartEl(partEl);
        }

        textScroll.rootEl.appendChild(partEl);

        const charTimer = createTimer({
            duration: chars.length * opts.charDelayMs + 100,
            updateInterval: opts.charDelayMs,
        });

        charTimer.on("update", () => updateTextbox(opts));
        charTimer.on("finish", () => {
            // updateTextbox(opts);
            const [part] = textScroll.parts.splice(0, 1);

            if (part) {
                part.sfxTimer.reset();
            }

            const nextPart = textScroll.parts[0];
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

        const part: TextScrollPart = {
            chars,
            charTimer,
            sfxTimer,
            partEl,
        };

        textScroll.parts.push(part);

        if (textScroll.parts.length === 1) {
            charTimer.play();
            sfxTimer.play();
            updateSfx(opts);
        }
    };

    const textScroll: TextScroll = {
        rootEl,
        parts: [],
        config,
        add,
    };

    return textScroll;
}
