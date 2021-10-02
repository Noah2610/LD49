import "./styles/index.scss";

import devImg from "./assets/dev.png";
import { loadSpritesheet } from "./spritesheet";

function main() {
    loadSpritesheet(devImg, {
        spriteSize: {
            w: 16,
            h: 16,
        },
    }).then((spritesheet) => {
        // @ts-ignore
        window.DBG = { spritesheet };
        spritesheet.insertDom(document.querySelector("#game")!);
    });
}

window.onload = main;
