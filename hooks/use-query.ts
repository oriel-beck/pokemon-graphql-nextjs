import { client } from "@app/client";
import { Query } from "@favware/graphql-pokemon";
import gql from "graphql-tag";
import { useState, useEffect } from "react";
import { PokemonLoadingStatus } from "../constants";
import { ApolloQueryResult } from "apollo-client";

export function useQuery<T>(query: ReturnType<typeof gql>) {
    const [state, setState] = useState(PokemonLoadingStatus.Loading);
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        client.query<T>({ query })
            .then((res) => {
                console.log(res.data)
                setData(res.data);
                setState(PokemonLoadingStatus.Success);
            }).catch(() => {
                setState(PokemonLoadingStatus.Failed);
            });
    }, []);

    return { state, data };
}