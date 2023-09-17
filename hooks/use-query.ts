import { client } from "@app/client";
import { Query } from "@favware/graphql-pokemon";
import gql from "graphql-tag";
import { useState, useEffect } from "react";
import { PokemonLoadingStatus } from "../constants";

export function useQuery(query: ReturnType<typeof gql>) {
    const [state, setState] = useState(PokemonLoadingStatus.Loading);
    const [data, setData] = useState<Query['getPokemon'] | null>(null);

    useEffect(() => {
        client.query<{ getPokemon: Query['getPokemon'] }>({ query })
            .then((res) => {
                setData(res.data.getPokemon);
                setState(PokemonLoadingStatus.Success);
            }).catch(() => {
                setState(PokemonLoadingStatus.Failed);
            });
    }, []);

    return { state, data };
}