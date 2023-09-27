import { PokemonRoot, PokemonV2Pokemon, PokemonV2Pokemonspecy2 } from "./query";

export class Pokemon {
    species: PokemonV2Pokemonspecy2[];
    pokemon: PokemonV2Pokemon;
    sprite: string;
    shinySprite: string;
    constructor(data: PokemonRoot['data']) {
        this.pokemon = data.pokemon_v2_pokemon[0];
        this.species = data.pokemon_v2_pokemonspecies;
        this.sprite = `http://play.pokemonshowdown.com/sprites/ani/${this.pokemon.name.toLowerCase()}.gif`;
        this.shinySprite = `https://play.pokemonshowdown.com/sprites/ani-shiny/${this.pokemon.name.toLowerCase()}.gif`;
    }

    toJSON() {
        return {
            pokemon: this.pokemon,
            species: this.species,
            sprite: this.sprite,
            shinySprite: this.shinySprite
        }
    }
}