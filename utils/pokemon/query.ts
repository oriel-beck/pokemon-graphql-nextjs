import { gql } from 'graphql-tag';


export const getPokemon = (pokemon: string) => gql(`{
    pokemon_v2_pokemon(where: {name: {_eq: "charizard"}}) {
      height
      weight
      name
      pokemon_v2_pokemonabilities {
        is_hidden
        pokemon_v2_ability {
          name
          pokemon_v2_abilityeffecttexts(distinct_on: short_effect, where: {language_id: {_eq: 9}}) {
            short_effect
            effect
          }
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          id
          name
        }
      }
      base_experience
      pokemon_v2_pokemonspecy {
        base_happiness
        capture_rate
        is_legendary
        is_mythical
        hatch_counter
        pokemon_v2_pokemondexnumbers {
          pokemon_v2_pokedex {
            name
          }
          pokedex_number
        }
        generation_id
        pokemon_v2_pokemoncolor {
          name
        }
        pokemon_v2_pokemonegggroups {
          pokemon_v2_egggroup {
            name
          }
        }
        pokemon_v2_growthrate {
          name
        }
        pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 9}}, distinct_on: name) {
          name
          genus
          id
        }
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
          pokemonV2TypeefficaciesByTargetTypeId {
            damage_factor
            pokemon_v2_type {
              name
            }
          }
        }
      }
    }
    pokemon_v2_pokemonspecies(where: {name: {_eq: "charizard"}}) {
      id
      name
      capture_rate
      base_happiness
      hatch_counter
      pokemon_v2_evolutionchain {
        pokemon_v2_pokemonspecies {
          name
        }
      }
    }
  }`);

export interface PokemonRoot {
    data: Data
}

export interface Data {
    pokemon_v2_pokemon: PokemonV2Pokemon[]
    pokemon_v2_pokemonspecies: PokemonV2Pokemonspecy2[]
}

export interface PokemonV2Pokemon {
    height: number
    weight: number
    name: string
    pokemon_v2_pokemonabilities: PokemonV2Pokemonability[]
    pokemon_v2_pokemonstats: PokemonV2Pokemonstat[]
    base_experience: number
    pokemon_v2_pokemonspecy: PokemonV2Pokemonspecy
}

export interface PokemonV2Pokemonability {
    is_hidden: boolean
    pokemon_v2_ability: PokemonV2Ability
}

export interface PokemonV2Ability {
    name: string
    pokemon_v2_abilityeffecttexts: PokemonV2Abilityeffecttext[]
}

export interface PokemonV2Abilityeffecttext {
    short_effect: string
    effect: string
}

export interface PokemonV2Pokemonstat {
    base_stat: number
    pokemon_v2_stat: PokemonV2Stat
}

export interface PokemonV2Stat {
    id: number
    name: string
}

export interface PokemonV2Pokemonspecy {
    base_happiness: number
    capture_rate: number
    is_legendary: boolean
    is_mythical: boolean
    hatch_counter: number
    pokemon_v2_pokemondexnumbers: PokemonV2Pokemondexnumber[]
    generation_id: number
    pokemon_v2_pokemoncolor: PokemonV2Pokemoncolor
    pokemon_v2_pokemonegggroups: PokemonV2Pokemonegggroup[]
    pokemon_v2_growthrate: PokemonV2Growthrate
    pokemon_v2_pokemonspeciesnames: PokemonV2Pokemonspeciesname[]
}

export interface PokemonV2Pokemondexnumber {
    pokemon_v2_pokedex: PokemonV2Pokedex
    pokedex_number: number
}

export interface PokemonV2Pokedex {
    name: string
}

export interface PokemonV2Pokemoncolor {
    name: string
}

export interface PokemonV2Pokemonegggroup {
    pokemon_v2_egggroup: PokemonV2Egggroup
}

export interface PokemonV2Egggroup {
    name: string
}

export interface PokemonV2Growthrate {
    name: string
}

export interface PokemonV2Pokemonspeciesname {
    name: string
    genus: string
    id: number
}

export interface PokemonV2Pokemonspecy2 {
    id: number
    name: string
    capture_rate: number
    base_happiness: number
    hatch_counter: number
    pokemon_v2_evolutionchain: PokemonV2Evolutionchain
}

export interface PokemonV2Evolutionchain {
    pokemon_v2_pokemonspecies: PokemonV2Pokemonspecy3[]
}

export interface PokemonV2Pokemonspecy3 {
    name: string
}
