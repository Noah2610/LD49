export type Action =
    | {
          type: "Noop";
      }
    | {
          type: "Debug";
          message: any;
      }
    | {
          type: "MoodChange";
          velocity: number;
      };

export type ActionType = Action["type"];

export const ACTION_TYPES: readonly ActionType[] = ["Debug", "MoodChange"];

export interface ActionEmitter {
    listeners: ActionEmitterListeners;

    on<A extends ActionType>(type: A, cb: ActionEventListener<A>): () => void;
    emit(action: Action): void;
    reset(): void;
}

export type ActionEmitterListeners = {
    [A in ActionType]: (ActionEventListener<A> | null)[];
};

export type ActionEventListener<A extends ActionType> = (
    action: ActionOfType<A>,
) => void;

export type ActionOfType<A extends ActionType> = Action & { type: A };
