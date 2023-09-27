"use client"

import { Box, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Toolbar, Typography } from "@mui/material";
import { PokemonV2Pokemonability } from "@utils/pokemon/query";
import { toTitleCase } from "@utils/util";
import Link from "next/link";

export function AbilitiesAbilityTable({ abilities }: { abilities: PokemonV2Pokemonability[] }) {
    return (
        <Box>
            <Toolbar>
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h5"
                    id="tableTitle"
                    component="h3"
                >
                    Abilities
                </Typography>
            </Toolbar>
            <Divider />
            <TableContainer>
                <Table aria-label="breeding stats">
                    <TableBody>
                        {abilities.map((ability, i) => (
                            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row" className="text-blue-500"><Link href={`/abilities/${ability.pokemon_v2_ability.name}`} replace={true}>{toTitleCase(ability.pokemon_v2_ability.name)} {ability.is_hidden ? '(hidden)' : <></>}</Link></TableCell>
                                <TableCell align="left">{ability.pokemon_v2_ability.pokemon_v2_abilityeffecttexts[0].effect}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}