import { SCREEN_SELECTOR_MAP, Screen } from ".";

export function showScreen(screen: Screen) {
    const activeScreenEl = document.querySelector(".screen.screen--active");
    if (activeScreenEl) {
        activeScreenEl.classList.remove("screen--active");
    }

    const targetScreenEl = document.querySelector(SCREEN_SELECTOR_MAP[screen]);
    if (targetScreenEl) {
        targetScreenEl.classList.add("screen--active");
    }
}
