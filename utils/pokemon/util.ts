import type { PokemonType } from "@favware/graphql-pokemon";

export function calculateTypeEffectiveness(types: readonly PokemonType[]) {
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
        // Access the defending matchups for the current type
        const defending = type.matchup.defending;

        // Update type effectiveness based on the matchups
        for (const effectiveType of defending.effectiveTypes) {
            typeEffectiveness[effectiveType] *= 2;
        }

        for (const resistedType of defending.resistedTypes) {
            typeEffectiveness[resistedType] *= 0.5;
        }

        for (const doubleEffectiveType of defending.doubleEffectiveTypes) {
            typeEffectiveness[doubleEffectiveType] *= 4;
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