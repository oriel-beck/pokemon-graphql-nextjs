import { Box, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Toolbar, Typography } from "@mui/material";
import { Pokemon } from "@utils/pokemon/class";
import { toTitleCase } from "@utils/util";

export function BreedingTable({ pokemon }: { pokemon: ReturnType<Pokemon['toJSON']> }) {
    return (
        <Box>
            <Toolbar>
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h5"
                    id="tableTitle"
                    component="h3"
                >
                    Breeding
                </Typography>
            </Toolbar>
            <Divider />
            <TableContainer>
                <Table aria-label="breeding stats">
                    <TableBody>
                        {/* Egg groups */}
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" className="text-gray-500">Egg groups</TableCell>
                            <TableCell align="left">{pokemon.pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemonegggroups.map((group) => toTitleCase(group.pokemon_v2_egggroup.name)).join(', ')}</TableCell>
                        </TableRow>

                        {/* Egg cycles */}
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" className="text-gray-500">Egg cycles</TableCell>
                            <TableCell align="left">{pokemon.pokemon.pokemon_v2_pokemonspecy.hatch_counter}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}