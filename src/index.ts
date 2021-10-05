import "./styles/index.scss";

import bgImg from "./assets/bg/bg_test_C.png";

import { expectEl } from "./util";
import { startGame, stopGame } from "./game";

function main() {
    setupBg();
    setupMenus();
}

function setupBg() {
    const bgEl = expectEl("#game #background");
    bgEl.style.backgroundImage = `url(${bgImg})`;
}

function setupMenus() {
    const startBtnEl = expectEl("#btn-start-game");
    startBtnEl.onclick = startGame;

    const resetBtnEl = expectEl("#btn-reset");
    resetBtnEl.onclick = stopGame;
}

window.onload = main;
