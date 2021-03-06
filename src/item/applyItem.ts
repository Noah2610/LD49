import { expectContext } from "../context";
import { expectEl, shuffle } from "../util";
import { Item } from ".";

const SFX_NAME = "syringe";

export function applyItem(item: Item, itemEl: HTMLElement) {
    const ctx = expectContext();

    if (ctx.isGameOver) return;

    if (item.labelRevealed) {
        item.label = item.labelRevealed;
        itemEl.title = item.label;
    }

    if (item.action) {
        ctx.actionEmitter.emit(item.action);
    }

    const emotionAction = item.emotionActions?.[ctx.character.mood.emotion];
    if (emotionAction) {
        ctx.actionEmitter.emit(emotionAction);
    }

    if (ctx.audio.sfx.audio.has(SFX_NAME)) {
        ctx.audio.sfx.play(SFX_NAME);
    }

    shuffleItemElements();
}

function shuffleItemElements() {
    const toolbarEl = expectEl("#game #toolbar");
    const els = shuffle(Array.from(toolbarEl.children));
    toolbarEl.innerHTML = "";
    toolbarEl.append(...els);
}
