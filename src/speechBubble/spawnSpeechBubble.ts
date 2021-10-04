import { expectEl, pick, Pos, randomRange, Range, Size } from "../util";

export interface SpawnSpeechBubbleOptions {
    text: string;
    despawnMs: number;
}

export function spawnSpeechBubble(options: SpawnSpeechBubbleOptions) {
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
    bubbleEl.innerText = options.text;
    bubbleEl.classList.add(
        "speech-bubble",
        `speech-bubble--corner-${corner}`,
        // "hidden",
    );
    bubbleEl.style.top = `${pos.y}px`;
    bubbleEl.style.left = `${pos.x}px`;

    rootEl.appendChild(bubbleEl);

    // setTimeout(() => bubbleEl.classList.remove("hidden"), 10);

    setTimeout(() => {
        bubbleEl.classList.add("speech-bubble--fade-out");
        setTimeout(() => rootEl.removeChild(bubbleEl), 500);
    }, options.despawnMs);
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
