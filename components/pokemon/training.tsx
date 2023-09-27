import { Box, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Toolbar, Typography } from "@mui/material";
import { Pokemon } from "@utils/pokemon/class";
import { toTitleCase } from "@utils/util";

export function TrainingTable({ pokemon }: { pokemon: ReturnType<Pokemon['toJSON']> }) {
    return (
        <Box>
            <Toolbar>
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h5"
                    id="tableTitle"
                    component="h3"
                >
                    Training
                </Typography>
            </Toolbar>
            <Divider />
            <TableContainer>
                <Table aria-label="training stats">
                    <TableBody>
                        {/* Capture rate */}
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" className="text-gray-500">Catch rate</TableCell>
                            <TableCell align="left">{pokemon.pokemon.pokemon_v2_pokemonspecy.capture_rate}</TableCell>
                        </TableRow>

                        {/* Base happiness */}
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" className="text-gray-500">Base happiness</TableCell>
                            <TableCell align="left">{pokemon.pokemon.pokemon_v2_pokemonspecy.base_happiness}</TableCell>
                        </TableRow>

                        {/* Base experience */}
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" className="text-gray-500">Base Exp.</TableCell>
                            <TableCell align="left">{pokemon.pokemon.base_experience}</TableCell>
                        </TableRow>

                        {/* Growth rate */}
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" className="text-gray-500">Growth rate</TableCell>
                            <TableCell align="left">{toTitleCase(pokemon.pokemon.pokemon_v2_pokemonspecy.pokemon_v2_growthrate.name, '-')}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}