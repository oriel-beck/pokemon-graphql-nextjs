import { createSlice } from "@reduxjs/toolkit";

export interface SearchState {
    pokemon: string;
    abilities: string;
    moves: string;
    items: string;
}

const initialState: SearchState = {
    pokemon: '',
    abilities: '',
    moves: '',
    items: ''
}

export const search = createSlice({
    name: "search",
    initialState,
    reducers: {
        reset: (state, { payload }) => {
            if (payload in initialState) {
                state[payload as keyof SearchState] = '';
            }
            return initialState;
        },
        setSearch: (state, { payload }) => {
            if (payload.key in initialState) {
                state[payload.key as keyof SearchState] = payload.value;
            }
        }
    }
});

export const {
    reset,
    setSearch,
} = search.actions;

export default search.reducer;