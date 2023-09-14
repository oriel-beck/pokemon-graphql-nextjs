import { Abilities } from "@favware/graphql-pokemon";
import { ReactElement } from "react";

// TODO: typings
export const parsers = Object.freeze({
    num: (value: number) => convertToStats('Pokedex entry', <>{value}</>),
    height: (value: number) => convertToStats('Height', <>{value}</>),
    weight: (value: number) => convertToStats('Weight', <>{value}</>),
    abilities: (value: Abilities) => {
        const arr = []
        for (const [key, ability] of Object.entries(value)) {
            if (key === "__typename") continue;
            if (!ability) continue;
            arr.push(<li key={ability.name}>{`${key}: ${ability.name} (${ability.shortDesc})`}</li>)
        }
        return convertToStats('Abilities', <ul>{arr}</ul>);
    },
    eggGroups: (value: string[]) => convertToStats('Egg groups', <>{value.join(', ')}</>),
    otherFormes: (value: string[]) => convertToStats('Other forms', <>{value.join(', ')}</>),
    catchRate: (value: { base: number, percentageWithOrdinaryPokeballAtFullHealth: string }) => convertToStats('Catch rate', <ul><li>Base: {value.base}</li><li>Full health: ${value.percentageWithOrdinaryPokeballAtFullHealth}</li></ul>),
    gender: (value: { female: string, male: string }) => convertToStats('Gender', <ul><li>Female: {value.female}</li><li>Male: {value.male}</li></ul>),
    baseStats: (value: { attack: number, defense: number, hp: number, specialattack: number, specialdefense: number }) => convertToStats('Base stats', <ul><li>Attack: {value.attack}</li><li>Defense: {value.defense}</li><li>HP: {value.hp}</li><li>Special Attack: {value.specialattack}</li><li>Special Defense: {value.specialdefense}</li></ul>),
    baseStatsTotal: (value: number) => convertToStats('Total stats',<>{value}</>),
    flavorTexts: (value: {flavor: string, game: string}[]) => convertToStats('Flavor texts', <ul>{value.map((v) => <li key={v.game}>{v.flavor} ({v.game})</li>)}</ul>),
    preevolutions: (value: {key: string}[]) => convertToStats('Pre-evolutions', <ul>{value.map((v) => <li key={v.key}>{v.key}</li>)}</ul>),
    evolutions: (value: {key: string}[]) => convertToStats('Evolutions', <ul>{value.map((v) => <li key={v.key}>{v.key}</li>)}</ul>),
    types: (value: any) => convertToStats('Types', <>'a very big object (wip)'</>)
});

const convertToStats = (head: string, value: ReactElement) => ({ head, value });