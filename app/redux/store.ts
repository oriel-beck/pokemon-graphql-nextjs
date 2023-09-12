import { configureStore } from "@reduxjs/toolkit";
import { default as pokemonReducer } from "@/app/redux/features/pokemonSlice";

export const store = configureStore({
    reducer: {
        pokemonReducer
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
