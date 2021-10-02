import { Pos, Size } from "../util";

export type SpriteIdx = number | string;

export interface Spritesheet {
    wrapperEl: HTMLElement;
    img: HTMLImageElement;
    spritesheetSize: Size;
    spriteSize: Size;
    spriteMap: SpritesheetSpriteMap;
    currentIdx: SpriteIdx;
    scale: Pos;

    insertDom(el: Element): void;
    showSprite(idx: SpriteIdx): void;
    resize(size: Size): void;
}

export type SpritesheetSpriteMap = Map<SpriteIdx, SpritesheetSprite>;

export interface SpritesheetSprite {
    offset: Pos;
}

export interface SpritesheetConfig {
    src: string;
    spriteSize: Size;
    spriteNames?: SpriteIdx[];
    size?: Size;
    currentIdx?: SpriteIdx;
}
