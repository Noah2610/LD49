import "./styles/index.scss";

import devImg from "./assets/dev.png";
import { createSpritesheet } from "./spritesheet";
import { expectEl } from "./util";
import { createAnimation } from "./animation";

function main() {
    dev();
}

async function dev() {
    const gameEl = expectEl("#game");
    const charEl = expectEl("#character", gameEl);

    const spritesheet = await createSpritesheet(devImg, {
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

    const animation = createAnimation(spritesheet, {
        loop: true,
        frames: [
            [0, 500],
            [1, 500],
            [0, 500],
            [1, 500],
            [0, 2000],
            [4, 250],
            [5, 250],
            [4, 250],
            [5, 250],
            [4, 250],
            [5, 250],
            [4, 250],
            [5, 250],
            [4, 250],
            [5, 250],
        ],
    });

    animation.play();

    // @ts-ignore
    window.DBG = { spritesheet, animation };
    spritesheet.insertDom(charEl);
}

window.onload = main;
