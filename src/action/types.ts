import { PartialSpeechBubbleOptions } from "../speechBubble";
import { TextScrollConfig } from "../textbox";
import { Range } from "../util";

export type Action =
    | {
          type: "Noop";
      }
    | {
          type: "Debug";
          message: any;
      }
    | {
          type: "Actions";
          actions: Action[];
      }
    | {
          type: "Random";
          actions: Action[];
      }
    | {
          type: "MoodChange";
          velocity: Range;
      }
    | {
          type: "PlaySfx";
          sfx: string;
      }
    | {
          type: "PauseSfx";
          sfx: string;
      }
    | {
          type: "AddText";
          text: string;
          config?: Partial<TextScrollConfig>;
      }
    | {
          type: "AddText";
          randomText: string[];
          config?: Partial<TextScrollConfig>;
      }
    | {
          type: "SpawnSpeechBubble";
          text: string;
          options?: PartialSpeechBubbleOptions;
      }
    | {
          type: "SpawnSpeechBubble";
          randomText: string[];
          options?: PartialSpeechBubbleOptions;
      }
    | {
          type: "PlayCharacterAnimation";
          animation: string;
      }
    | {
          type: "Delay";
          delayMs: number;
          action: Action;
      };

export type ActionType = Action["type"];

export interface ActionEmitter {
    listeners: ActionEmitterListeners;

    on<A extends ActionType>(type: A, cb: ActionEventListener<A>): () => void;
    emit(action: Action): void;
    reset(): void;
}

export type ActionEmitterListeners = {
    [A in ActionType]?: (ActionEventListener<A> | null)[];
};

export type ActionEventListener<A extends ActionType> = (
    action: ActionOfType<A>,
) => void;

export type ActionOfType<A extends ActionType> = Action & { type: A };
