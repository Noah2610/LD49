import { Spritesheet, SpritesheetConfig } from ".";

export async function loadSpritesheet(
    src: string,
    config: SpritesheetConfig,
): Promise<Spritesheet> {
    const img = await loadImage(src);
    const size = {
        w: img.width,
        h: img.height,
    };
    const spriteSize = config.spriteSize;
    return {
        img,
        size,
        spriteSize,
    };
}

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
    });
}
