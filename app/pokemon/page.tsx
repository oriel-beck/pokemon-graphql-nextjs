"use client"

import { Backdrop, Box, CircularProgress, Grid, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableRow, Tabs, Typography } from "@mui/material";
import { PokemonLoadingStatus, PokemonState } from "@redux/features/pokemon/pokemonSlice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useState } from "react";
import { StarNo } from "@app/icons/star-no";
import { Star } from "@app/icons/star";
import { convertToFt, convertToLb } from "@utils/util";
import { PokemonType } from "@favware/graphql-pokemon";

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
  return (
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
              <TableCell align="left">{pokemon.height}m ({convertToFt(pokemon.height)}ft)</TableCell>
            </TableRow>


            {/* Height */}
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row"><b>Weight</b></TableCell>
              <TableCell align="left">{pokemon.weight}kg ({convertToLb(pokemon.weight)}lb)</TableCell>
            </TableRow>

            {/* Height */}
            {/* <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row"><b>Weight</b></TableCell>
            <TableCell align="left">{pokemon.weight}kg ({pokemon.weight * 2.20462}lb)</TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container spacing={{ xs: 1 }} columns={{ xs: 4, md: 8 }}>
        {pokemon.types.map((t) => (
          <Grid item>
            { }
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={{ xs: 1 }} columns={{ xs: 4, md: 8 }}>
        {pokemon.types.map((t) => (
          <Grid item>
            { }
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

function calculateDefense(typeMatchup: ReadonlyArray<PokemonType>) {
  const obj: Record<string, number> = {};
  for (const matchup of typeMatchup) {
    for (const match of Object.entries(matchup.matchup.defending)) {
      switch (match[0]) {
        case "doubleEffectiveTypes":
        case "doubleResistedTypes":
        case "effectiveTypes":
        case "effectlessTypes":
        case "normalTypes":
        case "resistedTypes":
      }
    }
  }
}

function calculateDefenseUpdate(types: string[]) {
  for (const type of types) {
    
  }
}