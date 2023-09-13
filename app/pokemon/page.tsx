"use client"

import { useAppDispatch, useAppSelector } from "@app/redux/hooks";

export default function Page() {
  const pokemon = useAppSelector((state) => state.pokemonReducer);
  const search = useAppSelector((state) => state.searchReducer);
  const dispatch = useAppDispatch();
  
    return (
      <div>
       This is the pokemon page, you have searched: {search.pokemon}
      </div>
    )
  }
  