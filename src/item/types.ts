import { Action } from "../action";
import { Pos } from "../util";

export interface Item {
    type: ItemType;
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

export type ItemType = "Syringe" | "Toy";
