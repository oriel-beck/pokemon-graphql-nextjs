import type { Pokemon } from "@favware/graphql-pokemon";
import { createSlice } from "@reduxjs/toolkit";

export interface PokemonState extends Pokemon {
    loading: boolean;
    error: boolean;
}

const initialState: Partial<PokemonState> = {
    loading: true,
    error: false
}

export const pokemon = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        reset: () => initialState,
        setPokemon: (state, actions) => {
            state = actions.payload;
            state.loading = false;
        },
    }
});

export const {
    reset,
    setPokemon,
} = pokemon.actions;

export default pokemon.reducer;