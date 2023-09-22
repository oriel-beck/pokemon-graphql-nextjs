import { PokemonV2Pokemontype } from "./query";

export function calculateTypeEffectiveness(types: PokemonV2Pokemontype[]) {
    const typeEffectiveness: Record<string, number> = {
        normal: 1,
        fire: 1,
        water: 1,
        electric: 1,
        grass: 1,
        ice: 1,
        fighting: 1,
        poison: 1,
        ground: 1,
        flying: 1,
        psychic: 1,
        bug: 1,
        rock: 1,
        ghost: 1,
        dragon: 1,
        dark: 1,
        steel: 1,
        fairy: 1,
    };

    // Iterate through each type in the input array
    for (const type of types) {
        for (const resist of type.pokemon_v2_type.pokemonV2TypeefficaciesByTargetTypeId) {
            typeEffectiveness[resist.pokemon_v2_type.name] *= resist.damage_factor / 100;
        }
    }

    return typeEffectiveness;
}

const maxIV = 31;
const maxEV = 252;
const level = 100;
const goodNatureModifier = 1.1;
const badNatureModifier = 0.9;

// min/max stats
export const minStat = (baseStat: number) => Math.floor(baseStat * badNatureModifier) * level;
export const maxStat = (baseStat: number) => Math.floor(((2 * baseStat + maxIV + Math.floor(maxEV / 4)) * goodNatureModifier) / 100 + 5) * level;
export const precentageBaseStat = (baseStat: number) => baseStat > 255 ? 100 : ((baseStat - 1) / 254) * 100;