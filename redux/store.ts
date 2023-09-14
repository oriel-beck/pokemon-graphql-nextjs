import { configureStore } from "@reduxjs/toolkit";
import { default as pokemonReducer } from "@redux/features/pokemon/pokemonSlice";
import { default as searchReducer } from "@redux/features/search/searchSlice";

export const store = configureStore({
    reducer: {
        pokemonReducer,
        searchReducer
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;