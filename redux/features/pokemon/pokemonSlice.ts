import { client } from "@app/client";
import { Query } from "@favware/graphql-pokemon";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPokemon } from "@utils/pokemon/query";

export interface PokemonState {
    status: PokemonLoadingStatus;
    pokemon: Query['getPokemon'];
}

export enum PokemonLoadingStatus {
    Initial,
    Loading,
    Success,
    Failed
}

const initialState: Partial<PokemonState> = {
    status: PokemonLoadingStatus.Initial
}

export const pokemon = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        reset: () => initialState,
        loadPokemon: (state, { payload }) => {
            state.pokemon = payload;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchPokemonData.pending, (state) => {
            state.status = PokemonLoadingStatus.Loading;
        })
        .addCase(fetchPokemonData.fulfilled, (state, action) => {
            // @ts-expect-error (incompatible types)
            state.pokemon = action.payload;
            state.status = PokemonLoadingStatus.Success;
        })
        .addCase(fetchPokemonData.rejected, (state) => {
            state.status = PokemonLoadingStatus.Failed;
        })
    }
});

export const fetchPokemonData = createAsyncThunk('pokemon/fetchPokemonData', async (pokemon: string) => {
    const res = await client.query<{getPokemon: Query['getPokemon']}>({
        query: getPokemon(pokemon)
    });
    return res.data.getPokemon
});

export const {
    reset,
    loadPokemon,
} = pokemon.actions;

export default pokemon.reducer;