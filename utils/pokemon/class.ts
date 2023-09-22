import { PokemonRoot, PokemonV2Pokemon, PokemonV2Pokemonspecy2 } from "./query";

export class Pokemon {
    species: PokemonV2Pokemonspecy2[];
    pokemon: PokemonV2Pokemon;
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