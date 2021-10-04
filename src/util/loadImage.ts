export function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = createImage(src);
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
    });
}

export function createImage(src: string): HTMLImageElement {
    const img = new Image();
    img.src = src;
    return img;
}
