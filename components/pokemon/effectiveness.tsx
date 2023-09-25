import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { Pokemon } from "@utils/pokemon/class";
import { calculateTypeEffectiveness } from "@utils/pokemon/util";
import Image from "next/image";

export function Effectiveness({ pokemon }: { pokemon: Pokemon }) {
    const defenseEffectiveness = calculateTypeEffectiveness(pokemon.pokemon.pokemon_v2_pokemontypes);
    return (
        <TableContainer component={Paper} className="mb-16" >
            <Table aria-label="pokedex stats">
                <TableBody>
                    {/* TODO: recalculate using the better stats */}
                    {mapEffectivenessToTableCells(defenseEffectiveness)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export function mapEffectivenessToTableCells(types: Record<string, number>) {
    let num = 0;
    const arr = [];
    const keys = Object.keys(types);
    const values = Object.values(types);
    while (!!keys.length) {
        const tmpkeys = [];
        for (const key of keys.splice(0, 9)) {
            tmpkeys.push(
                <TableCell align="center" key={++num}>
                    <Image
                        src={`/${key}.png`}
                        alt={key}
                        height={35}
                        width={35}
                        style={{
                            minWidth: 35
                        }}
                    />
                </TableCell>
            )
        }

        arr.push(<TableRow key={++num} >{tmpkeys}</TableRow>);

        const tmpvalues = [];
        for (const value of values.splice(0, 9)) {
            tmpvalues.push(
                <TableCell align="center" key={++num}>
                    {value}
                </TableCell>
            )

        }

        arr.push(<TableRow key={++num}>{tmpvalues}</TableRow>);
    }

    return arr;
}