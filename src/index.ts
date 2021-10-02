import "./styles/index.scss";

import devImg from "./assets/dev.png";
import { loadSpritesheet } from "./spritesheet";
import { expectEl } from "./util";

function main() {
    dev();
}

async function dev() {
    const gameEl = expectEl("#game");
    const charEl = expectEl("#character", gameEl);

    const spritesheet = await loadSpritesheet(devImg, {
        spriteSize: {
            w: 16,
            h: 16,
        },
        size: {
            w: 64,
            h: 64,
        },
        currentIdx: 2,
    });

    // @ts-ignore
    window.DBG = { spritesheet };
    spritesheet.insertDom(charEl);
}

window.onload = main;
