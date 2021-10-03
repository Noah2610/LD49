import {
    ActionEmitter,
    ActionEventListener,
    ActionType,
    ACTION_TYPES,
} from ".";

export function createActionEmitter(): ActionEmitter {
    const on: ActionEmitter["on"] = (type, cb) => {
        if (!emitter.listeners[type]) {
            emitter.listeners[type] = [];
        }

        const idx = emitter.listeners[type]!.length;
        emitter.listeners[type]![idx] = cb as ActionEventListener<ActionType>;
        return () => (emitter.listeners[type]![idx] = null);
    };

    const emit: ActionEmitter["emit"] = (action) => {
        const listeners = emitter.listeners[action.type];
        if (!listeners) return;

        for (const listener of listeners) {
            if (listener) {
                (listener as ActionEventListener<ActionType>)(action);
            }
        }
    };

    const reset: ActionEmitter["reset"] = () => {
        emitter.listeners = {};
    };

    const emitter: ActionEmitter = {
        listeners: {},
        on,
        emit,
        reset,
    };

    return emitter;
}
