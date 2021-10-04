import { SpeechBubble } from ".";
import { TEXTBOX_CONFIG } from "../config/textbox";
import { createTextScroll, TextScrollConfig } from "../textbox";
import { expectEl, pick, Pos, randomRange, Range, Size } from "../util";

export interface SpeechBubbleOptions {
    despawnMs: number;
    scrollConfig: TextScrollConfig;
}

export type PartialSpeechBubbleOptions = Partial<SpeechBubbleOptions> & {
    scrollConfig?: Partial<TextScrollConfig>;
};

const DEFAULT_SPAWN_SPEECH_BUBBLE_OPTIONS: SpeechBubbleOptions = {
    despawnMs: 3000,
    scrollConfig: TEXTBOX_CONFIG,
};

const FADE_ANIM_DELAY_MS = 500;

export function spawnSpeechBubble(
    text: string,
    options?: PartialSpeechBubbleOptions,
): SpeechBubble {
    const opts = {
        ...DEFAULT_SPAWN_SPEECH_BUBBLE_OPTIONS,
        ...options,
        scrollConfig: {
            ...DEFAULT_SPAWN_SPEECH_BUBBLE_OPTIONS.scrollConfig,
            ...options?.scrollConfig,
        },
    };

    const rootEl = expectEl("#game #speech-bubbles");

    const corner = pick(SPEECH_BUBBLE_CORNERS)!;

    const areaSize: Size = {
        w: rootEl.clientWidth,
        h: rootEl.clientHeight,
    };

    let spawnRange: {
        x: Range;
        y: Range;
    };
    switch (corner) {
        case "top-left": {
            spawnRange = {
                x: {
                    min: 0,
                    max: areaSize.w * 0.5,
                },
                y: {
                    min: 0,
                    max: areaSize.h * 0.5,
                },
            };
            break;
        }
        case "top-right": {
            spawnRange = {
                x: {
                    min: areaSize.w * 0.5,
                    max: areaSize.w,
                },
                y: {
                    min: 0,
                    max: areaSize.h * 0.5,
                },
            };
            break;
        }
        case "bottom-left": {
            spawnRange = {
                x: {
                    min: 0,
                    max: areaSize.w * 0.5,
                },
                y: {
                    min: areaSize.h * 0.5,
                    max: areaSize.h,
                },
            };
            break;
        }
        case "bottom-right": {
            spawnRange = {
                x: {
                    min: areaSize.w * 0.5,
                    max: areaSize.w,
                },
                y: {
                    min: areaSize.h * 0.5,
                    max: areaSize.h,
                },
            };
            break;
        }
    }

    const pos: Pos = {
        x: randomRange(spawnRange.x),
        y: randomRange(spawnRange.y),
    };

    const bubbleEl = document.createElement("div");
    // bubbleEl.innerText = text;
    bubbleEl.classList.add(
        "speech-bubble",
        `speech-bubble--corner-${corner}`,
        // "hidden",
    );
    bubbleEl.style.top = `${pos.y}px`;
    bubbleEl.style.left = `${pos.x}px`;

    rootEl.appendChild(bubbleEl);

    const speechBubble: SpeechBubble = {
        scroll: createTextScroll(bubbleEl, opts.scrollConfig),
    };

    // setTimeout(() => bubbleEl.classList.remove("hidden"), 10);

    setTimeout(() => speechBubble.scroll.add(text), FADE_ANIM_DELAY_MS / 2);

    setTimeout(() => {
        bubbleEl.classList.add("speech-bubble--fade-out");
        setTimeout(() => rootEl.removeChild(bubbleEl), FADE_ANIM_DELAY_MS);
    }, opts.despawnMs);

    return speechBubble;
}

const SPEECH_BUBBLE_CORNERS = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
] as const;

type SpeechBubbleCorner = typeof SPEECH_BUBBLE_CORNERS[number];

function getCornerOpposite(corner: SpeechBubbleCorner): SpeechBubbleCorner {
    switch (corner) {
        case "top-left": {
            return "bottom-right";
        }
        case "top-right": {
            return "bottom-left";
        }
        case "bottom-left": {
            return "top-right";
        }
        case "bottom-right": {
            return "top-left";
        }
    }
}
