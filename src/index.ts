import devImg from "./assets/dev.png";
import { loadSpritesheet } from "./spritesheet";

function main() {
    loadSpritesheet(devImg, {
        spriteSize: {
            w: 16,
            h: 16,
        },
    }).then(console.log);
}

window.onload = main;
