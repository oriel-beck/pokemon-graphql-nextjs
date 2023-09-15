"use client"

import { Backdrop, CircularProgress} from "@mui/material";
import { PokemonLoadingStatus } from "@redux/features/pokemon/pokemonSlice";
import { useAppSelector } from "@redux/hooks";
import { PokemonDisplay } from "@components/pokemon/main";

export default function Page() {
  const pokemonState = useAppSelector((state) => state.pokemonReducer);

  switch (pokemonState.status) {
    case PokemonLoadingStatus.Loading:
      return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    case PokemonLoadingStatus.Success:
      return <PokemonDisplay pokemon={pokemonState.pokemon!} />
    case PokemonLoadingStatus.Failed:
      return <>Pokemon does not exist</>
    default:
      return <>Please search a pokemon</>
  }
}