import { Pos, Size, createImage } from "../util";
import { Spritesheet, SpritesheetConfig, SpritesheetSpriteMap } from ".";

export function createSpritesheet(config: SpritesheetConfig): Spritesheet {
    const img = createImage(config.src);
    const spriteSize = config.spriteSize;

    const spriteMap: SpritesheetSpriteMap = new Map();
    let i = 0;
    for (let y = 0; y < img.height; y += spriteSize.h) {
        for (let x = 0; x < img.width; x += spriteSize.w) {
            const sIdx = config.spriteNames?.[i] ?? i;
            spriteMap.set(sIdx, {
                offset: { x, y },
            });
            i++;
        }
    }
    const currentIdx = config.spriteNames?.[0] ?? 0;

    const scale: Pos = { x: 1, y: 1 };

    const wrapperEl = document.createElement("div");
    wrapperEl.classList.add("img");

    wrapperEl.appendChild(img);

    const insertDom: Spritesheet["insertDom"] = (el) =>
        el.appendChild(wrapperEl);

    const showSprite: Spritesheet["showSprite"] = (idx) => {
        const sprite = spritesheet.spriteMap.get(idx);
        if (!sprite) {
            console.error(`[showSprite] Couldn't find sprite with idx: ${idx}`);
            return;
        }
        const offset = {
            x: -(sprite.offset.x * spritesheet.scale.x),
            y: -(sprite.offset.y * spritesheet.scale.y),
        };
        spritesheet.img.style.left = `${offset.x}px`;
        spritesheet.img.style.top = `${offset.y}px`;

        spritesheet.currentIdx = idx;
    };

    const resize: Spritesheet["resize"] = (size) => {
        const scale: Pos = {
            x: size.w / spritesheet.spriteSize.w,
            y: size.h / spritesheet.spriteSize.h,
        };
        const wrapperSize: Size = {
            w: spritesheet.spriteSize.w * scale.x,
            h: spritesheet.spriteSize.h * scale.y,
        };
        const imgSize: Size = {
            w: spritesheet.spritesheetSize.w * scale.x,
            h: spritesheet.spritesheetSize.h * scale.y,
        };
        spritesheet.wrapperEl.style.width = `${wrapperSize.w}px`;
        spritesheet.wrapperEl.style.height = `${wrapperSize.h}px`;
        spritesheet.img.style.width = `${imgSize.w}px`;
        spritesheet.img.style.height = `${imgSize.h}px`;

        spritesheet.scale = scale;

        spritesheet.showSprite(spritesheet.currentIdx);
    };

    const spritesheet: Spritesheet = {
        wrapperEl,
        img,
        spritesheetSize: { w: 0, h: 0 },
        spriteSize,
        spriteMap,
        currentIdx,
        scale,
        insertDom,
        showSprite,
        resize,
    };

    showSprite(config.currentIdx ?? currentIdx);

    img.onload = () => {
        spritesheet.spritesheetSize = {
            w: spritesheet.img.width,
            h: spritesheet.img.height,
        };
        spritesheet.resize(config.size ?? spritesheet.spriteSize);
    };

    return spritesheet;
}
