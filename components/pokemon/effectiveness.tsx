import { Box, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Toolbar, Typography } from "@mui/material";
import { Pokemon } from "@utils/pokemon/class";
import { calculateTypeEffectiveness } from "@utils/pokemon/util";
import Image from "next/image";

export function Effectiveness({ pokemon }: { pokemon: ReturnType<Pokemon['toJSON']> }) {
    const defenseEffectiveness = calculateTypeEffectiveness(pokemon.pokemon.pokemon_v2_pokemontypes);
    return (
        <Box>
            <Toolbar>
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h5"
                    id="tableTitle"
                    component="h3"
                >
                    Type defenses
                </Typography>
            </Toolbar>
            <Divider/>
            <TableContainer>
                <Table aria-label="pokedex stats">
                    <TableBody>
                        {/* TODO: add hover text to images (and icons) */}
                        {mapEffectivenessToTableCells(defenseEffectiveness)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
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