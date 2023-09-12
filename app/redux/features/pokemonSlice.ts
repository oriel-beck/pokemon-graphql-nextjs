import { Pokemon } from "@favware/graphql-pokemon";
import { createSlice } from "@reduxjs/toolkit";

export interface PokemonState extends Pokemon {
    loading: boolean;
    error: boolean;
}

const initialState: Partial<PokemonState> = {
    loading: false,
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
        startLoading: (state) => {
            state.loading = true;
        }
    }
});

export const {
    reset,
    setPokemon,
    startLoading
} = pokemon.actions;

export default pokemon.reducer;