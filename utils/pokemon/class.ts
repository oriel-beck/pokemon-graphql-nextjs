import { PokemonRoot } from "./query";

export class Pokemon {
    species: import("c:/Users/oriel/projects/frontends-private/project1/utils/pokemon/query").PokemonV2Pokemonspecy2[];
    pokemon: import("c:/Users/oriel/projects/frontends-private/project1/utils/pokemon/query").PokemonV2Pokemon;
    sprite: string;
    shinySprite: string;
    constructor(data: PokemonRoot['data']) {
        console.log(data)
        this.pokemon = data.pokemon_v2_pokemon[0];
        this.species = data.pokemon_v2_pokemonspecies;
        this.sprite = `http://play.pokemonshowdown.com/sprites/dex/${this.pokemon.name.toLowerCase()}.png`;
        this.shinySprite = `https://play.pokemonshowdown.com/sprites/dex-shiny/${this.pokemon.name.toLowerCase()}.png`;
    }
}