"use client"

import { Backdrop, CircularProgress } from "@mui/material";
import { PokemonDisplay } from "@components/pokemon/main";
import { useParams } from "next/navigation";
import { PokemonRoot, getPokemon } from "@utils/pokemon/query";
import { useQuery } from "../../../hooks/use-query";
import { PokemonLoadingStatus } from "../../../constants";
import { Pokemon } from "@utils/pokemon/class";

export default function Page() {
    const params = useParams();
    const pokemon = params.name as string;
    const { state, data } = useQuery<PokemonRoot>(getPokemon(pokemon));
    const pokedata = data as unknown as PokemonRoot['data'];

    switch (state) {
        case PokemonLoadingStatus.Loading:
            return <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        case PokemonLoadingStatus.Success:
            return <PokemonDisplay pokemon={new Pokemon(pokedata)} />
        case PokemonLoadingStatus.Failed:
            return <>Pokemon does not exist</>
        default:
            return <>Please search a pokemon</>
    }
}