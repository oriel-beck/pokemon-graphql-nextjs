import { Pokemon } from "@favware/graphql-pokemon";
import { createSlice } from "@reduxjs/toolkit";

export interface SearchState {
    pokemon: string;
    ability: string;
    move: string;
    item: string;
}

const initialState: SearchState = {
    pokemon: '',
    ability: '',
    move: '',
    item: ''
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