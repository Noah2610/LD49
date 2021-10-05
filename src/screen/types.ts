export type Screen = "MainMenu" | "Game";

export const SCREEN_SELECTOR_MAP = {
    MainMenu: "#main-menu.screen",
    Game: "#game.screen",
} as const;
