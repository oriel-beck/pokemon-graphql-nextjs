import { PokemonRoot, getPokemon } from "@utils/pokemon/query";
import { Pokemon } from "@utils/pokemon/class";
import { client } from "@app/client";
import { PokemonTabs } from "@components/pokemon/main";

export default async function Page({ params }: { params: { name: string } }) {
    const pokemon = params.name as string;
    const res = await client.query<PokemonRoot>({ query: getPokemon(pokemon) });
    const pokedata = res.data as unknown as PokemonRoot['data'];

    // TODO: add tabs/links for pokemon variants (i.e: mega, charizard-y/x, etc)
    return <PokemonTabs pokemon={new Pokemon(pokedata).toJSON()} />
}