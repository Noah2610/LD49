import { Pos, Size } from "../util";

export interface Spritesheet<SIdx = number> {
    wrapperEl: HTMLElement;
    img: HTMLImageElement;
    spritesheetSize: Size;
    spriteSize: Size;
    spriteMap: SpritesheetSpriteMap<SIdx>;
    currentIdx: SIdx;
    scale: Pos;

    insertDom(el: Element): void;
    showSprite(idx: SIdx): void;
    resize(size: Size): void;
}

export type SpritesheetSpriteMap<SIdx> = Map<SIdx, SpritesheetSprite>;

export interface SpritesheetSprite {
    offset: Pos;
}

export interface SpritesheetConfig<SIdx = number> {
    spriteSize: Size;
    spriteNames?: SIdx[];
    size?: Size;
    currentIdx?: SIdx;
}
