import "./styles/index.scss";

import devImg from "./assets/spr_test_B.png";
import bgImg from "./assets/bg/bg_test_B.png";

import { createSpritesheet } from "./spritesheet";
import { expectEl } from "./util";
import { createAnimation } from "./animation";
import { createAnimationContainer } from "./animation/createAnimationContainer";
import { store } from "./store";

function main() {
    dev();

    setupBg();
    setupMood();
}

function setupBg() {
    const bgEl = expectEl("#game #background");
    bgEl.style.backgroundImage = `url(${bgImg})`;
}

function setupMood() {}

function dev() {
    // @ts-ignore
    window.DBG = { store };
}

// async function dev() {
//     const gameEl = expectEl("#game");
//     const charEl = expectEl("#character", gameEl);

//     const spritesheet = await createSpritesheet(devImg, {
//         spriteSize: {
//             w: 48,
//             h: 80,
//         },
//         // 0.6
//         // 1.666667
//         size: {
//             w: 400.0,
//             h: 666,
//         },
//         currentIdx: 0,
//     });

//     const animation = createAnimation(spritesheet, {
//         loop: true,
//         frames: [
//             [0, 130],
//             [1, 130],
//             [2, 130],
//             [3, 130],
//             [4, 130],
//             [5, 130],
//             [6, 130],
//             [7, 130],
//         ],
//     });

//     // animation.play();

//     const animationContainer = createAnimationContainer(spritesheet, {
//         defaultAnimation: "default",
//         animations: {
//             default: {
//                 loop: true,
//                 frames: [
//                     [0, 130],
//                     [1, 130],
//                     [2, 130],
//                     [3, 130],
//                     [4, 130],
//                     [5, 130],
//                     [6, 130],
//                     [7, 130],
//                 ],
//             },
//             other: {
//                 loop: false,
//                 frames: [
//                     [4, 500],
//                     [1, 500],
//                     [4, 500],
//                     [1, 500],
//                 ],
//             },
//         },
//     });

//     animationContainer.play("default");

//     // setTimeout(() => animationContainer.play("other"), 2000);

//     // @ts-ignore
//     window.DBG = { spritesheet, animation };
//     spritesheet.insertDom(charEl);
// }

window.onload = main;
