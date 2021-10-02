import { Size } from "../util";

export interface Spritesheet {
    img: HTMLImageElement;
    size: Size;
    spriteSize: Size;
}

export interface SpritesheetConfig {
    spriteSize: Size;
}
