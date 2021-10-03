import {
    ActionEmitter,
    ActionEventListener,
    ActionType,
    ACTION_TYPES,
} from ".";

export function createActionEmitter(): ActionEmitter {
    const generateDefaultListeners = (): ActionEmitter["listeners"] =>
        ACTION_TYPES.reduce<ActionEmitter["listeners"]>(
            (acc, a) => ({
                ...acc,
                [a]: [],
            }),
            {} as ActionEmitter["listeners"],
        );

    const on: ActionEmitter["on"] = (type, cb) => {
        const idx = emitter.listeners[type].length;
        emitter.listeners[type][idx] = cb as ActionEventListener<ActionType>;
        return () => (emitter.listeners[type][idx] = null);
    };

    const emit: ActionEmitter["emit"] = (action) => {
        for (const listener of emitter.listeners[action.type]) {
            if (listener) {
                (listener as ActionEventListener<ActionType>)(action);
            }
        }
    };

    const reset: ActionEmitter["reset"] = () => {
        emitter.listeners = generateDefaultListeners();
    };

    const emitter: ActionEmitter = {
        listeners: generateDefaultListeners(),
        on,
        emit,
        reset,
    };

    return emitter;
}
