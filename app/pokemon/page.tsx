"use client"

import { useAppDispatch, useAppSelector } from "@app/redux/hooks";

export default function Page() {
  const pokemon = useAppSelector((state) => state.pokemonReducer);
  const dispatch = useAppDispatch();
  
    return (
      <div>
       This is the home page, search from here, redirect search to /pokemon/{"{searchResult}"}
      </div>
    )
  }
  