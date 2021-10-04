import { Action } from "../action";
import { Pos } from "../util";
import { Spritesheet } from "../spritesheet";
import { Emotion } from "../mood";

export interface Item {
    type: ItemType;
    spritesheet: Spritesheet;
    draggingState: ItemDraggingState;
    action?: Action;
    emotionActions?: EmotionActions;
    label?: string;
    labelRevealed?: string;
}

export type ItemDraggingState =
    | {
          isDragging: false;
      }
    | {
          isDragging: true;
          offset: Pos;
      };

export type ItemType = typeof ITEM_TYPES[number];

export const ITEM_TYPES = ["Upper", "Downer"] as const;

export type EmotionActions = {
    [E in Emotion]?: Action;
};
