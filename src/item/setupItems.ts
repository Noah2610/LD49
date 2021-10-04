import { expectEl, pick, Pos, shuffle } from "../util";
import { ITEM_CONFIG } from "../config/item";
import { expectContext } from "../context";
import { createSpritesheet } from "../spritesheet";
import { Item, ItemType, ITEM_TYPES } from ".";

type PickedTypeCounts = { [T in ItemType]: number };

export function setupItems(): [Item[], () => void] {
    const toolbarEl = expectEl("#game #toolbar");
    const characterEl = expectEl("#game #character");
    const config = ITEM_CONFIG;

    const items: Item[] = [];
    const unsubs: (() => void)[] = [];

    const createOnMouseDown = (
        item: Item,
        itemEl: HTMLElement,
    ): ((event: MouseEvent | TouchEvent) => void) => {
        return (event) => {
            if (item.draggingState.isDragging) return;

            const pos = getAbsoluteElementPos(itemEl);
            const mousePos = getAbsoluteMousePosOfEvent(event);
            const offset: Pos = {
                x: pos.x - mousePos.x,
                y: pos.y - mousePos.y,
            };

            itemEl.classList.add("item--dragging");

            itemEl.style.top = `${pos.y}px`;
            itemEl.style.left = `${pos.x}px`;

            const parentEl = itemEl.parentElement;
            if (parentEl) {
                parentEl.style.width = `${itemEl.clientWidth}px`;
                parentEl.style.height = `${itemEl.clientHeight}px`;
            }

            item.draggingState = {
                isDragging: true,
                offset,
            };
        };
    };

    const createOnMouseUp = (
        item: Item,
        itemEl: HTMLElement,
    ): ((event: MouseEvent | TouchEvent) => void) => {
        return (event) => {
            if (!item.draggingState.isDragging) return;

            if (
                doRectsCollide(
                    itemEl.getBoundingClientRect(),
                    characterEl.getBoundingClientRect(),
                )
            ) {
                applyItem(item, itemEl);
            }

            itemEl.classList.remove("item--dragging");

            itemEl.style.top = "0";
            itemEl.style.left = "0";

            item.draggingState = {
                isDragging: false,
            };
        };
    };

    const createOnMouseMove = (
        item: Item,
        itemEl: HTMLElement,
    ): ((event: MouseEvent | TouchEvent) => void) => {
        return (event) => {
            if (!item.draggingState.isDragging) return;

            const curPos = getAbsoluteElementPos(itemEl);
            const mousePos = getAbsoluteMousePosOfEvent(event);

            const newPos: Pos = {
                x: mousePos.x + item.draggingState.offset.x,
                y: mousePos.y + item.draggingState.offset.y,
            };

            itemEl.style.top = `${newPos.y}px`;
            itemEl.style.left = `${newPos.x}px`;
        };
    };

    const randomItems = shuffle(config.randomItems);
    const pickedTypeCounts: PickedTypeCounts = ITEM_TYPES.reduce(
        (acc, t) => ({
            ...acc,
            [t]: 0,
        }),
        {} as PickedTypeCounts,
    );

    const nextItemType = (): ItemType => {
        let fewestTypes: ItemType = pick(ITEM_TYPES)!;
        for (const itemType of ITEM_TYPES) {
            if (pickedTypeCounts[itemType] < pickedTypeCounts[fewestTypes]) {
                fewestTypes = itemType;
            }
        }
        pickedTypeCounts[fewestTypes]++;
        return fewestTypes;
    };

    for (const randomItem of randomItems) {
        const itemConfig = config.types[nextItemType()];

        const spritesheet = createSpritesheet(randomItem.spritesheet);
        spritesheet.img.setAttribute("draggable", "false");

        const item: Item = {
            type: itemConfig.type,
            spritesheet,
            draggingState: {
                isDragging: false,
            },
            action: itemConfig.action,
            emotionActions: itemConfig.emotionActions,
            label: itemConfig.label,
            labelRevealed: itemConfig.labelRevealed,
        };

        items.push(item);

        const itemWrapperEl = document.createElement("div");
        itemWrapperEl.classList.add("item-wrapper");

        const itemEl = document.createElement("div");
        itemEl.classList.add("item", `item--${item.type.toLowerCase()}`);
        if (item.label) {
            itemEl.title = item.label;
        }

        const onMouseDown = createOnMouseDown(item, itemEl);
        itemEl.addEventListener("mousedown", onMouseDown);
        itemEl.addEventListener("touchstart", onMouseDown);
        unsubs.push(
            () => itemEl.removeEventListener("mousedown", onMouseDown),
            () => itemEl.removeEventListener("touchstart", onMouseDown),
        );

        const onMouseUp = createOnMouseUp(item, itemEl);
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("touchend", onMouseUp);
        unsubs.push(
            () => document.removeEventListener("mouseup", onMouseUp),
            () => document.removeEventListener("touchend", onMouseUp),
        );

        const onMouseMove = createOnMouseMove(item, itemEl);
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("touchmove", onMouseMove);
        unsubs.push(
            () => document.removeEventListener("mousemove", onMouseMove),
            () => document.removeEventListener("touchmove", onMouseMove),
        );

        item.spritesheet.insertDom(itemEl);

        itemWrapperEl.appendChild(itemEl);
        toolbarEl.appendChild(itemWrapperEl);
    }

    return [items, () => unsubs.forEach((cb) => cb())];
}

function applyItem(item: Item, itemEl: HTMLElement) {
    const ctx = expectContext();

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

    shuffleItemElements();
}

function shuffleItemElements() {
    const toolbarEl = expectEl("#game #toolbar");
    const els = shuffle(Array.from(toolbarEl.children));
    toolbarEl.innerHTML = "";
    toolbarEl.append(...els);
}

function getAbsoluteElementPos(el: HTMLElement): Pos {
    const rect = el.getBoundingClientRect();
    return {
        x: rect.x,
        y: rect.y,
    };
}

function getAbsoluteMousePosOfEvent(event: MouseEvent | TouchEvent): Pos {
    return {
        x: "pageX" in event ? event.pageX : event.touches[0]!.pageX,
        y: "pageY" in event ? event.pageY : event.touches[0]!.pageY,
    };
}

function doRectsCollide(a: DOMRect, b: DOMRect): boolean {
    // prettier-ignore
    return (
        (
            a.left >= b.left &&
            a.left < b.right
        ) || (
            a.left <= b.left &&
            a.right > b.left
        )
    ) && (
        (
            a.top >= b.top &&
            a.top < b.bottom
        ) || (
            a.top <= b.top &&
            a.bottom > b.top
        )
    )
}
