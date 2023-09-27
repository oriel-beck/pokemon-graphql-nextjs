import { PokemonRoot, getPokemon } from "@utils/pokemon/query";
import { Pokemon } from "@utils/pokemon/class";
import { client } from "@app/client";
import { MainStats } from "@components/pokemon/main";
import { Metadata, ResolvingMetadata } from "next";
import { convertToFt, convertToLb } from "@utils/util";

export async function generateMetadata(
    { params }: { params: { name: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const pokemon = params.name;

    const res = await client.query<PokemonRoot>({ query: getPokemon(pokemon) }).catch(() => null);
    if (!res) {
        const graph = (await parent).openGraph;
        return {
            title: (await parent).title,
            description: (await parent).description,
            openGraph: {
                images: graph?.images || [],
                url: graph?.url!
            }
        }
    }
    
    const pokedata = res.data as unknown as PokemonRoot['data'];
    const data = new Pokemon(pokedata);

    return {
        title: "Pokemon wiki",
        description: `- National Pokedex entry: ${data.pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemondexnumbers[0].pokedex_number}\n- Species: ${data.pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames[0].genus}\n- Height: ${data.pokemon.height / 10}m (${convertToFt(data.pokemon.height / 10)})\n- Weight: ${data.pokemon.weight / 10}kg (${convertToLb(data.pokemon.weight / 10)}lb)\n\nAbilities: \n${data.pokemon.pokemon_v2_pokemonabilities.map((ability) => `- ${ability.pokemon_v2_ability.name}`).join('\n')}`,
        openGraph: {
            images: [data.sprite]
        },
    }
}

export default async function Page({ params }: { params: { name: string } }) {
    const pokemon = params.name;
    const res = await client.query<PokemonRoot>({ query: getPokemon(pokemon) });
    const pokedata = res.data as unknown as PokemonRoot['data'];

    // TODO: add tabs/links for pokemon variants (i.e: mega, charizard-y/x, etc)
    return <MainStats pokemon={new Pokemon(pokedata).toJSON()} />
}