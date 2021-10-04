import { createTimer } from "timesub";
import { TEXTBOX_CONFIG } from "../config/textbox";
import { expectEl } from "../util";
import { expectContext } from "../context";
import { createTextScroll, Textbox, TextScrollConfig, TextScrollPart } from ".";

export function createTextbox(): Textbox {
    const rootEl = expectEl("#game #textbox");
    const config = TEXTBOX_CONFIG;

    const scroll = createTextScroll(rootEl, config);

    const textbox: Textbox = {
        scroll,
    };

    return textbox;
}
