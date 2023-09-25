import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { precentageBaseStat } from "@utils/pokemon/util";
import { LinearProgressWithLabel } from "./bar";
import { Pokemon } from "@utils/pokemon/class";

export function StatsBars({ pokemon }: { pokemon: Pokemon }) {
    return (
        <TableContainer component={Paper} >
            <Table aria-label="pokedex stats">
                <TableBody>
                    {/* HP */}
                    < TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }
                    }>
                        <TableCell component="th" scope="row"><b>HP</b></TableCell>
                        <TableCell align="center">
                            <Box sx={{ width: '100%' }}>
                                <LinearProgressWithLabel value={precentageBaseStat(pokemon.pokemon.pokemon_v2_pokemonstats[0].base_stat)} />
                            </Box>
                        </TableCell>
                    </TableRow >

                    {/* ATTACK */}
                    < TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"><b>Attack</b></TableCell>
                        <TableCell align="center">
                            <Box sx={{ width: '100%' }}>
                                <LinearProgressWithLabel value={precentageBaseStat(pokemon.pokemon.pokemon_v2_pokemonstats[1].base_stat)} />
                            </Box>
                        </TableCell>
                    </TableRow >

                    {/* DEFENSE */}
                    < TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"><b>Defense</b></TableCell>
                        <TableCell align="center">
                            <Box sx={{ width: '100%' }}>
                                <LinearProgressWithLabel value={precentageBaseStat(pokemon.pokemon.pokemon_v2_pokemonstats[2].base_stat)} />
                            </Box>
                        </TableCell>
                    </TableRow >

                    {/* SA */}
                    < TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"><b>Special Attack</b></TableCell>
                        <TableCell align="center">
                            <Box sx={{ width: '100%' }}>
                                <LinearProgressWithLabel value={precentageBaseStat(pokemon.pokemon.pokemon_v2_pokemonstats[3].base_stat)} />
                            </Box>
                        </TableCell>
                    </TableRow >

                    {/* SD */}
                    < TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"><b>Special Defense</b></TableCell>
                        <TableCell align="center">
                            <Box sx={{ width: '100%' }}>
                                <LinearProgressWithLabel value={precentageBaseStat(pokemon.pokemon.pokemon_v2_pokemonstats[4].base_stat)} />
                            </Box>
                        </TableCell>
                    </TableRow >

                    {/* SPEED */}
                    < TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row" sx={{ width: '25%'}}><b>Speed</b></TableCell>
                        <TableCell align="center">
                            <Box sx={{ width: '100%' }}>
                                <LinearProgressWithLabel value={precentageBaseStat(pokemon.pokemon.pokemon_v2_pokemonstats[5].base_stat)} />
                            </Box>
                        </TableCell>
                    </TableRow >
                </TableBody>
            </Table>
        </TableContainer>
    )
}