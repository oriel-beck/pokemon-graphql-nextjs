"use client"
import { Box, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Toolbar, Typography } from "@mui/material";
import { precentageBaseStat } from "@utils/pokemon/util";
import { LinearProgressWithLabel } from "../../bar/bar";
import { Pokemon } from "@utils/pokemon/class";

export function StatsBars({ pokemon }: { pokemon: ReturnType<Pokemon['toJSON']> }) {
    return (
        <Box>
            <Toolbar>
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h5"
                    id="tableTitle"
                    component="h3"
                >
                    Base stats
                </Typography>
            </Toolbar>
            <Divider/>
            <TableContainer >
                <Table aria-label="base stats">
                    <TableBody>
                        {/* HP */}
                        < TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }
                        }>
                            <TableCell component="th" scope="row" className="text-gray-500">HP</TableCell>
                            <TableCell align="center">
                                <Box sx={{ width: '100%' }}>
                                    <LinearProgressWithLabel value={precentageBaseStat(pokemon.pokemon.pokemon_v2_pokemonstats[0].base_stat)} />
                                </Box>
                            </TableCell>
                        </TableRow >

                        {/* ATTACK */}
                        < TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" className="text-gray-500">Attack</TableCell>
                            <TableCell align="center">
                                <Box sx={{ width: '100%' }}>
                                    <LinearProgressWithLabel value={precentageBaseStat(pokemon.pokemon.pokemon_v2_pokemonstats[1].base_stat)} />
                                </Box>
                            </TableCell>
                        </TableRow >

                        {/* DEFENSE */}
                        < TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" className="text-gray-500">Defense</TableCell>
                            <TableCell align="center">
                                <Box sx={{ width: '100%' }}>
                                    <LinearProgressWithLabel value={precentageBaseStat(pokemon.pokemon.pokemon_v2_pokemonstats[2].base_stat)} />
                                </Box>
                            </TableCell>
                        </TableRow >

                        {/* SA */}
                        < TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" className="text-gray-500">Special Attack</TableCell>
                            <TableCell align="center">
                                <Box sx={{ width: '100%' }}>
                                    <LinearProgressWithLabel value={precentageBaseStat(pokemon.pokemon.pokemon_v2_pokemonstats[3].base_stat)} />
                                </Box>
                            </TableCell>
                        </TableRow >

                        {/* SD */}
                        < TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" className="text-gray-500">Special Defense</TableCell>
                            <TableCell align="center">
                                <Box sx={{ width: '100%' }}>
                                    <LinearProgressWithLabel value={precentageBaseStat(pokemon.pokemon.pokemon_v2_pokemonstats[4].base_stat)} />
                                </Box>
                            </TableCell>
                        </TableRow >

                        {/* SPEED */}
                        < TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" sx={{ width: '25%' }} className="text-gray-500">Speed</TableCell>
                            <TableCell align="center">
                                <Box sx={{ width: '100%' }}>
                                    <LinearProgressWithLabel value={precentageBaseStat(pokemon.pokemon.pokemon_v2_pokemonstats[5].base_stat)} />
                                </Box>
                            </TableCell>
                        </TableRow >
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}