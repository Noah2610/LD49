import { expectEl, Pos } from "../util";
import { ITEMS_CONFIG } from "../config/item";
import { Item } from ".";

export function setupItems(): [Item[], () => void] {
    const toolbarEl = expectEl("#game #toolbar");

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

    for (const itemConfig of ITEMS_CONFIG) {
        const item: Item = {
            type: itemConfig.type,
            draggingState: {
                isDragging: false,
            },
        };

        items.push(item);

        const itemWrapperEl = document.createElement("div");
        itemWrapperEl.classList.add("item-wrapper");

        const itemEl = document.createElement("div");
        itemEl.classList.add("item", `item--${item.type.toLowerCase()}`);

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

        itemWrapperEl.appendChild(itemEl);
        toolbarEl.appendChild(itemWrapperEl);
    }

    return [items, () => unsubs.forEach((cb) => cb())];
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
