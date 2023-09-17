"use client"

import { Backdrop, CircularProgress } from "@mui/material";
import { PokemonLoadingStatus } from "@redux/features/pokemon/pokemonSlice";
import { PokemonDisplay } from "@components/pokemon/main";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { client } from "@app/client";
import { Query } from "@favware/graphql-pokemon";
import { getPokemon } from "@utils/pokemon/query";

export default function Page() {
    const params = useParams();
    const pokemon = params.name as string;
    const [state, setState] = useState(PokemonLoadingStatus.Loading);
    const [pokemonData, setPokemonData] = useState<Query['getPokemon'] | null>(null);

    useEffect(() => {
        client.query<{ getPokemon: Query['getPokemon'] }>({
            query: getPokemon(pokemon)
        }).then((res) => {
            setPokemonData(res.data.getPokemon);
            setState(PokemonLoadingStatus.Success);
        }).catch(() => {
            setState(PokemonLoadingStatus.Failed);
        });
    }, []);

    switch (state) {
        case PokemonLoadingStatus.Loading:
            return <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        case PokemonLoadingStatus.Success:
            return <PokemonDisplay pokemon={pokemonData!} />
        case PokemonLoadingStatus.Failed:
            return <>Pokemon does not exist</>
        default:
            return <>Please search a pokemon</>
    }
}