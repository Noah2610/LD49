import createStore from "zustand/vanilla";
import { Character, createCharacter } from "../character";
import { Emotion } from "../mood";

export interface State {
    character?: Character;
    currentEmotion?: Emotion;

    updateMood(): void;
}

export const store = createStore<State>((set, get, api) => {
    createCharacter().then((character) => set({ character }));

    return {
        updateMood() {
            const state = get();
            state.character?.mood.update();
            set({ currentEmotion: state.character?.mood.emotion });
        },
    };
});
