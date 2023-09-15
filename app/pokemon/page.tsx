"use client"

import { Backdrop, Box, CircularProgress, Grid, LinearProgress, LinearProgressProps, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableRow, Tabs, Typography } from "@mui/material";
import { PokemonLoadingStatus, PokemonState } from "@redux/features/pokemon/pokemonSlice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useState } from "react";
import { StarNo } from "@app/icons/star-no";
import { Star } from "@app/icons/star";
import { convertToFt, convertToLb } from "@utils/util";
import { PokemonType } from "@favware/graphql-pokemon";
import Image from "next/image";

export default function Page() {
  const pokemonState = useAppSelector((state) => state.pokemonReducer);
  const dispatch = useAppDispatch();

  switch (pokemonState.status) {
    case PokemonLoadingStatus.Loading:
      return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    case PokemonLoadingStatus.Success:
      return <PokemonDisplay pokemon={pokemonState.pokemon!} />
    case PokemonLoadingStatus.Failed:
      return <>Pokemon does not exist</>
    default:
      return <>Please search a pokemon</>
  }
}

function PokemonDisplay({ pokemon }: { pokemon: PokemonState['pokemon'] }) {
  const [showShiny, setShowShiny] = useState(false);

  function showSprite() {
    if (!showShiny && !pokemon?.sprite) return '/pokemon-placeholder.png';
    if (showShiny && !pokemon?.shinySprite) return '/pokemon-placeholder.png';
    return showShiny ? pokemon.shinySprite : pokemon.sprite;
  }

  return (
    <Grid container spacing={{ xs: 1, md: 1, }} columns={{ xs: 4, md: 9 }} className="mt-auto">
      <Grid item xs={4} md={3} className="flex max-h-38 justify-center items-center bg-green-200" style={{
        paddingTop: '1%',
        flexDirection: 'column',
        maxHeight: '40rem'
      }}>
        {/* TODO: stick to right */}
        <div className="flex flex-row p-2" style={{ width: '80%', height: '80%', justifyContent: 'flex-end', cursor: 'pointer' }} onClick={() => setShowShiny(!showShiny)}>
          {showShiny ? <StarNo /> : <Star />}
        </div>
        <img
          className="w-2/4 h-2/4"
          src={showSprite()}
          alt={pokemon.key}
          height={400}
          width={300}
        />
        {/* TODO: decrease margin top of image and everything for mobile */}
        <div className="bg-blue-700 p-4 rounded-md flex text-white mt-10 mb-12">
          <Typography variant="h5" component="h3">
            {pokemon.key[0].toUpperCase() + pokemon.key.substring(1)}
          </Typography>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row'
        }}>
          {pokemon.types.map((t) => <img
            key={t.name}
            src={`/${t.name.toLowerCase()}.png`}
            alt={t.name}
            height={45}
            width={45}
            style={{
              marginInline: '5px',
              // TODO: adapt to mobile
              marginBottom: '2rem',
              maxHeight: '45px'
            }}
          />)}
        </div>
      </Grid>
      <Grid item xs={4} md={6}>
        <PokemonTabs pokemon={pokemon} />
      </Grid>
    </Grid>
  )
}


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function PokemonTabs({ pokemon }: { pokemon: PokemonState['pokemon'] }) {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="primary" indicatorColor="secondary">
          <Tab label="Stats" {...a11yProps(0)} className="placeholder-sky-50" />
          <Tab label="Abilities" {...a11yProps(1)} />
          <Tab label="Move-sets" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <HardcodedStatsTable pokemon={pokemon} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Abilities
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Movesets
      </CustomTabPanel>
    </>
  )
}

function HardcodedStatsTable({ pokemon }: { pokemon: PokemonState['pokemon'] }) {
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

              {/* Height */}
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row"><b>Height</b></TableCell>
                <TableCell align="left">{pokemon.height}m ({convertToFt(pokemon.height)})</TableCell>
              </TableRow>


              {/* Height */}
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row"><b>Weight</b></TableCell>
                <TableCell align="left">{pokemon.weight}kg ({convertToLb(pokemon.weight)}lb)</TableCell>
              </TableRow>

              {/* Height */}
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row"><b>HP</b></TableCell>
                <TableCell align="left">
                  <Box sx={{ width: '100%' }}>
                    <LinearProgressWithLabel value={percentage(pokemon.baseStats.hp, maxDefaultStat(pokemon.baseStats.hp))} />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row"><b>Attack</b></TableCell>
                <TableCell align="left">
                  <Box sx={{ width: '100%' }}>
                    <LinearProgressWithLabel value={percentage(pokemon.baseStats.attack, maxDefaultStat(pokemon.baseStats.attack))} />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row"><b>Defense</b></TableCell>
                <TableCell align="left">
                  <Box sx={{ width: '100%' }}>
                    <LinearProgressWithLabel value={percentage(pokemon.baseStats.defense, maxDefaultStat(pokemon.baseStats.defense))} />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row"><b>Special Attack</b></TableCell>
                <TableCell align="left">
                  <Box sx={{ width: '100%' }}>
                    <LinearProgressWithLabel value={percentage(pokemon.baseStats.specialattack, maxDefaultStat(pokemon.baseStats.specialattack))} />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row"><b>Special Defense</b></TableCell>
                <TableCell align="left">
                  <Box sx={{ width: '100%' }}>
                    <LinearProgressWithLabel value={percentage(pokemon.baseStats.specialdefense, maxDefaultStat(pokemon.baseStats.specialdefense))} />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row"><b>Speed</b></TableCell>
                <TableCell align="left">
                  <Box sx={{ width: '100%' }}>
                    <LinearProgressWithLabel value={percentage(pokemon.baseStats.speed, maxDefaultStat(pokemon.baseStats.speed))} />
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <TableContainer component={Paper} >
        <Table aria-label="pokedex stats">
          <TableBody>
            {mapTypesToTableCells(defenseEffectiveness)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

function calculateTypeEffectiveness(types: readonly PokemonType[]) {
  const typeEffectiveness: Record<string, number> = {
    normal: 1,
    fire: 1,
    water: 1,
    electric: 1,
    grass: 1,
    ice: 1,
    fighting: 1,
    poison: 1,
    ground: 1,
    flying: 1,
    psychic: 1,
    bug: 1,
    rock: 1,
    ghost: 1,
    dragon: 1,
    dark: 1,
    steel: 1,
    fairy: 1,
  };

  // Iterate through each type in the input array
  for (const type of types) {
    // Access the defending matchups for the current type
    const defending = type.matchup.defending;

    // Update type effectiveness based on the matchups
    for (const effectiveType of defending.effectiveTypes) {
      typeEffectiveness[effectiveType] *= 2;
    }

    for (const resistedType of defending.resistedTypes) {
      typeEffectiveness[resistedType] *= 0.5;
    }

    for (const doubleEffectiveType of defending.doubleEffectiveTypes) {
      typeEffectiveness[doubleEffectiveType] *= 4;
    }
  }

  return typeEffectiveness;
}

function mapTypesToTableCells(types: Record<string, number>) {
  let num = 0;
  const arr = [];
  const keys = Object.keys(types);
  const values = Object.values(types);
  while (!!keys.length) {
    const tmpkeys = [];
    for (const key of keys.splice(0, 9)) {
      tmpkeys.push(
        <TableCell align="center" key={`${num}-${key}`}>
          <Image
            src={`/${key}.png`}
            alt={key}
            height={45}
            width={45}
          />
        </TableCell>
      )
    }
    arr.push(<TableRow>{tmpkeys}</TableRow>)

    const tmpvalues = [];
    for (const value of values.splice(0, 9)) {
      tmpvalues.push(
        <TableCell align="center" key={`${num}-${value}`}>
          {value}
        </TableCell>
      )
    }
    arr.push(<TableRow>{tmpvalues}</TableRow>)
  }

  return arr;
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const maxIV = 31;
const maxEV = 252;
const level = 100;
const goodNatureModifier = 1.1;
const badNatureModifier = 0.9;

const percentage = (partialValue: number, totalValue: number) => (100 * partialValue) / totalValue;

// min/max stats
const minStat = (baseStat: number) => Math.floor(baseStat * badNatureModifier) * level;
const maxStat = (baseStat: number) => Math.floor(((2 * baseStat + maxIV + Math.floor(maxEV / 4)) * goodNatureModifier) / 100 + 5) * level;
const maxDefaultStat = (baseStat: number) => Math.floor(2 * baseStat + 5);