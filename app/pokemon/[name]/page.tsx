"use client"

import { Backdrop, CircularProgress } from "@mui/material";
import { PokemonLoadingStatus } from "@redux/features/pokemon/pokemonSlice";
import { PokemonDisplay } from "@components/pokemon/main";
import { useParams } from "next/navigation";
import { getPokemon } from "@utils/pokemon/query";
import { useQuery } from "../../../hooks/use-query";

export default function Page() {
    const params = useParams();
    const pokemon = params.name as string;
    const { state, data } = useQuery(getPokemon(pokemon));

    switch (state) {
        case PokemonLoadingStatus.Loading:
            return <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        case PokemonLoadingStatus.Success:
            return <PokemonDisplay pokemon={data!} />
        case PokemonLoadingStatus.Failed:
            return <>Pokemon does not exist</>
        default:
            return <>Please search a pokemon</>
    }
}