import { Action } from "../action";
import { Pos } from "../util";
import { Spritesheet } from "../spritesheet";

export interface Item {
    type: ItemType;
    spritesheet: Spritesheet;
    draggingState: ItemDraggingState;
    action: Action;
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
