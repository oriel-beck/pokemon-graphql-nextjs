"use client"

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";

export default function Page({ params }: {
  params: {
    name: string;
  }
}) {
  const pokemon = useAppSelector((state) => state.pokemonReducer);
  const dispatch = useAppDispatch();

  return (
    <div>
      {
        pokemon.loading ?
          <>
          Pokemon {params.name} is loading
          </>
          :
          <>
          Pokemon {params.name} is loaded
          </>
      }
    </div>
  )
}
