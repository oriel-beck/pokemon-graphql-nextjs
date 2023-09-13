"use client"

import { PokemonLoadingStatus } from "@redux/features/pokemon/pokemonSlice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { ReactElement } from "react";
import { inspect } from "util";

export default function Page() {
  const pokemon = useAppSelector((state) => state.pokemonReducer);
  const dispatch = useAppDispatch();

  return (
    <div>
      <PokemonStatusCase status={pokemon.status!} />
      {inspect(pokemon.pokemon, false, Infinity)}
    </div>
  )
}

function PokemonStatusCase({ status }: { status: PokemonLoadingStatus }): ReactElement {
  switch (status) {
    case PokemonLoadingStatus.Loading:
      return <>Loading, please wait</>
    case PokemonLoadingStatus.Success:
      return <>Found pokemon</>
    case PokemonLoadingStatus.Failed:
      return <>Pokemon does not exist</>
    default:
      return <>Please search a pokemon</>
  }
}
