import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import type { PokemonState } from "@redux/features/pokemon/pokemonSlice";
import { calculateTypeEffectiveness, precentageBaseStat } from "@utils/pokemon/util";
import { convertToFt, convertToLb } from "@utils/util";
import { LinearProgressWithLabel } from "./bar";
import { mapEffectivenessToTableCells } from "./effectiveness";

export function StatsTable({ pokemon }: { pokemon: PokemonState['pokemon'] }) {
    const defenseEffectiveness = calculateTypeEffectiveness(pokemon.types);
  
    return (
      <>
        <div className="flex flex-row space-x-5 p-5">
          <TableContainer component={Paper} >
            <Table aria-label="pokedex stats">
              <TableBody>
                {/* Pokedex num */}
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row"><b>Pokedex Entry</b></TableCell>
                  <TableCell align="left">{pokemon.num}</TableCell>
                </TableRow>
  
                {/* HEIGHT */}
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row"><b>Height</b></TableCell>
                  <TableCell align="left">{pokemon.height}m ({convertToFt(pokemon.height)})</TableCell>
                </TableRow>
  
  
                {/* WEIGHT */}
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row"><b>Weight</b></TableCell>
                  <TableCell align="left">{pokemon.weight}kg ({convertToLb(pokemon.weight)}lb)</TableCell>
                </TableRow>
  
                {/* HP */}
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row"><b>HP</b></TableCell>
                  <TableCell align="left">
                    <Box sx={{ width: '100%' }}>
                      <LinearProgressWithLabel value={precentageBaseStat(pokemon.baseStats.hp)} />
                    </Box>
                  </TableCell>
                </TableRow>

                {/* ATTACK */}
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row"><b>Attack</b></TableCell>
                  <TableCell align="left">
                    <Box sx={{ width: '100%' }}>
                      <LinearProgressWithLabel value={precentageBaseStat(pokemon.baseStats.attack)} />
                    </Box>
                  </TableCell>
                </TableRow>

                {/* DEFENSE */}
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row"><b>Defense</b></TableCell>
                  <TableCell align="left">
                    <Box sx={{ width: '100%' }}>
                      <LinearProgressWithLabel value={precentageBaseStat(pokemon.baseStats.defense)} />
                    </Box>
                  </TableCell>
                </TableRow>

                {/* SA */}
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row"><b>Special Attack</b></TableCell>
                  <TableCell align="left">
                    <Box sx={{ width: '100%' }}>
                      <LinearProgressWithLabel value={precentageBaseStat(pokemon.baseStats.specialattack)} />
                    </Box>
                  </TableCell>
                </TableRow>

                {/* SD */}
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row"><b>Special Defense</b></TableCell>
                  <TableCell align="left">
                    <Box sx={{ width: '100%' }}>
                      <LinearProgressWithLabel value={precentageBaseStat(pokemon.baseStats.specialdefense)} />
                    </Box>
                  </TableCell>
                </TableRow>

                {/* SPEED */}
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row"><b>Speed</b></TableCell>
                  <TableCell align="left">
                    <Box sx={{ width: '100%' }}>
                      <LinearProgressWithLabel value={precentageBaseStat(pokemon.baseStats.speed)} />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <TableContainer component={Paper} className="mb-12" >
          <Table aria-label="pokedex stats">
            <TableBody>
              {mapEffectivenessToTableCells(defenseEffectiveness)}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  }
  