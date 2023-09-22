import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { calculateTypeEffectiveness, precentageBaseStat } from "@utils/pokemon/util";
import { convertToFt, convertToLb } from "@utils/util";
import { LinearProgressWithLabel } from "./bar";
import { mapEffectivenessToTableCells } from "./effectiveness";
import type { Pokemon } from "@utils/pokemon/class";

export function StatsTable({ pokemon }: { pokemon: Pokemon }) {
    const defenseEffectiveness = calculateTypeEffectiveness(pokemon.pokemon.pokemon_v2_pokemontypes);
  
    return (
      <>
        <div className="flex flex-row space-x-5 p-1 pb-2">
          <TableContainer component={Paper} >
            <Table aria-label="pokedex stats">
              <TableBody>
                {/* Pokedex num */}
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row"><b>National Pokedex Entry</b></TableCell>
                  <TableCell align="left">{pokemon.pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemondexnumbers[0].pokedex_number}</TableCell>
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
  
                {/* HP */}
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row"><b>HP</b></TableCell>
                  <TableCell align="left">
                    <Box sx={{ width: '100%' }}>
                      <LinearProgressWithLabel value={precentageBaseStat(pokemon.pokemon.pokemon_v2_pokemonstats[0].base_stat)} />
                    </Box>
                  </TableCell>
                </TableRow>

                {/* ATTACK */}
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row"><b>Attack</b></TableCell>
                  <TableCell align="left">
                    <Box sx={{ width: '100%' }}>
                      <LinearProgressWithLabel value={precentageBaseStat(pokemon.pokemon.pokemon_v2_pokemonstats[1].base_stat)} />
                    </Box>
                  </TableCell>
                </TableRow>

                {/* DEFENSE */}
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row"><b>Defense</b></TableCell>
                  <TableCell align="left">
                    <Box sx={{ width: '100%' }}>
                      <LinearProgressWithLabel value={precentageBaseStat(pokemon.pokemon.pokemon_v2_pokemonstats[2].base_stat)} />
                    </Box>
                  </TableCell>
                </TableRow>

                {/* SA */}
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row"><b>Special Attack</b></TableCell>
                  <TableCell align="left">
                    <Box sx={{ width: '100%' }}>
                      <LinearProgressWithLabel value={precentageBaseStat(pokemon.pokemon.pokemon_v2_pokemonstats[3].base_stat)} />
                    </Box>
                  </TableCell>
                </TableRow>

                {/* SD */}
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row"><b>Special Defense</b></TableCell>
                  <TableCell align="left">
                    <Box sx={{ width: '100%' }}>
                      <LinearProgressWithLabel value={precentageBaseStat(pokemon.pokemon.pokemon_v2_pokemonstats[4].base_stat)} />
                    </Box>
                  </TableCell>
                </TableRow>

                {/* SPEED */}
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row"><b>Speed</b></TableCell>
                  <TableCell align="left">
                    <Box sx={{ width: '100%' }}>
                      <LinearProgressWithLabel value={precentageBaseStat(pokemon.pokemon.pokemon_v2_pokemonstats[5].base_stat)} />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <TableContainer component={Paper} className="mb-16" >
          <Table aria-label="pokedex stats">
            <TableBody>
              {/* TODO: recalculate using the better stats */}
              {mapEffectivenessToTableCells(defenseEffectiveness)}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  }
  