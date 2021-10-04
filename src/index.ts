import "./styles/index.scss";

import bgImg from "./assets/bg/bg_test_C.png";

import { expectEl } from "./util";
import { startGame } from "./game";

function main() {
    setupBg();
    startGame();
    dev();
}

function setupBg() {
    const bgEl = expectEl("#game #background");
    bgEl.style.backgroundImage = `url(${bgImg})`;
}

function dev() {
    // setInterval(() => {
    //     spawnSpeechBubble({
    //         text: pick([
    //             "Lmao",
    //             "Yeet",
    //             "Owch",
    //             "Oh-oh",
    //             "Crazy!",
    //             "What's going on?!",
    //             "Where am I?",
    //             "I'm scared.",
    //             "Help me.",
    //             "Run.",
    //         ])!,
    //         despawnMs: 5000,
    //     });
    // }, 2000);
    //
    // const ctx = expectContext();
    //
    // setInterval(() => {
    // ctx.textbox.add("Hello World!");
    // }, 5000);
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
