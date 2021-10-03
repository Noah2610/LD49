import {
    ActionEmitter,
    ActionEventListener,
    ActionType,
    ACTION_TYPES,
} from ".";

export function createActionEmitter(): ActionEmitter {
    const on: ActionEmitter["on"] = (type, cb) => {
        emitter.listeners[type].push(cb as ActionEventListener<ActionType>);
    };

    const emit: ActionEmitter["emit"] = (action) => {
        for (const listener of emitter.listeners[action.type]) {
            (listener as ActionEventListener<ActionType>)(action);
        }
    };

    const emitter: ActionEmitter = {
        listeners: ACTION_TYPES.reduce<ActionEmitter["listeners"]>(
            (acc, a) => ({
                ...acc,
                [a]: [],
            }),
            {} as ActionEmitter["listeners"],
        ),
        on,
        emit,
    };

    return emitter;
}
