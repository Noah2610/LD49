import { createTimer } from "timesub";
import { expectContext } from "../context";
import { pick } from "../util";
import { TextScroll, TextScrollConfig, TextScrollPart } from ".";

export function createTextScroll(
    rootEl: HTMLElement,
    config: TextScrollConfig,
): TextScroll {
    const updateTextbox = (config: TextScrollConfig) => {
        const part = textScroll.parts[0];
        if (!part) return;

        const [chr] = part.chars.splice(0, 1);
        if (chr === undefined) {
            part.charTimer.reset();
            part.sfxTimer.reset();

            textScroll.parts.splice(0, 1);

            const nextPart = textScroll.parts[0];
            if (nextPart) {
                nextPart.charTimer.play();
                nextPart.sfxTimer.play();
                updateSfx(nextPart.config);
            }

            return;
        }

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
        const sfx = Array.isArray(config.sfx) ? pick(config.sfx) : config.sfx;
        if (sfx && ctx.audio.sfx.audio.has(sfx)) {
            ctx.audio.sfx.play(sfx);
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
            duration: "infinite",
            updateInterval: opts.charDelayMs,
        });

        charTimer.on("update", () => updateTextbox(opts));
        // charTimer.on("finish", () => {
        //     // updateTextbox(opts);
        //     const [part] = textScroll.parts.splice(0, 1);

        //     if (part) {
        //         part.sfxTimer.reset();
        //     }

        //     const nextPart = textScroll.parts[0];
        //     if (nextPart) {
        //         nextPart.charTimer.play();
        //         nextPart.sfxTimer.play();
        //         updateSfx(opts);
        //     }
        // });

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
            config: opts,
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
