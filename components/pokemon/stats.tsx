"use client"

import { Box, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Toolbar, Typography } from "@mui/material";
import { convertToFt, convertToLb } from "@utils/util";
import type { Pokemon } from "@utils/pokemon/class";
import Link from "next/link";

export function StatsTable({ pokemon }: { pokemon: ReturnType<Pokemon['toJSON']> }) {
  return (
    <Box>
      <Toolbar>
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h5"
          id="tableTitle"
          component="h3"
        >
          Pokédex data
        </Typography>
      </Toolbar>
      <Divider/>
      <TableContainer>
        <Table aria-label="pokedex data">
          <TableBody>
            {/* Pokedex num */}
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" className="text-gray-500">National Pokedex Entry</TableCell>
              <TableCell align="left">{pokemon.pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemondexnumbers[0].pokedex_number}</TableCell>
            </TableRow>

            {/* Species (genus) */}
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" className="text-gray-500">Species</TableCell>
              <TableCell align="left">{pokemon.pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames[0].genus}</TableCell>
            </TableRow>

            {/* HEIGHT */}
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" className="text-gray-500">Height</TableCell>
              <TableCell align="left">{pokemon.pokemon.height / 10}m ({convertToFt(pokemon.pokemon.height / 10)})</TableCell>
            </TableRow>

            {/* WEIGHT */}
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" className="text-gray-500">Weight</TableCell>
              <TableCell align="left">{pokemon.pokemon.weight / 10}kg ({convertToLb(pokemon.pokemon.weight / 10)}lb)</TableCell>
            </TableRow>

            {/* Abilities */}
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" className="text-gray-500">Abilities</TableCell>
              <TableCell align="left"><ul>{pokemon.pokemon.pokemon_v2_pokemonabilities.map((ability) => (<li key={ability.pokemon_v2_ability.name}><Link href={`/abilities/${ability.pokemon_v2_ability.name}`} replace={true}>{ability.pokemon_v2_ability.name} {ability.is_hidden ? <span>(hidden)</span> : <></>}</Link></li>))}</ul></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
