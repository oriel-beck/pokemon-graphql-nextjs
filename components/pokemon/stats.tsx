import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { convertToFt, convertToLb } from "@utils/util";
import type { Pokemon } from "@utils/pokemon/class";

export function StatsTable({ pokemon }: { pokemon: Pokemon }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="pokedex stats">
        <TableBody>
          {/* Pokedex num */}
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row"><b>National Pokedex Entry</b></TableCell>
            <TableCell align="left">{pokemon.pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemondexnumbers[0].pokedex_number}</TableCell>
          </TableRow>

          {/* Species (genus) */}
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row"><b>Species</b></TableCell>
            <TableCell align="left">{pokemon.pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames[0].genus}</TableCell>
          </TableRow>

          {/* HEIGHT */}
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row"><b>Height</b></TableCell>
            <TableCell align="left">{pokemon.pokemon.height / 10}m ({convertToFt(pokemon.pokemon.height / 10)})</TableCell>
          </TableRow>

          {/* WEIGHT */}
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row"><b>Weight</b></TableCell>
            <TableCell align="left">{pokemon.pokemon.weight / 10}kg ({convertToLb(pokemon.pokemon.weight / 10)}lb)</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
