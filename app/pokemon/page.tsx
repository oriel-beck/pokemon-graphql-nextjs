"use client"
import Image from "next/image";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { PokemonLoadingStatus, PokemonState } from "@redux/features/pokemon/pokemonSlice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { ReactElement, useState } from "react";
import { StarNo } from "@app/icons/star-no";
import { Star } from "@app/icons/star";

export default function Page() {
  const pokemon = useAppSelector((state) => state.pokemonReducer);
  const dispatch = useAppDispatch();

  return (
    <>
      <PokemonStatusCase state={pokemon} />
    </>
  )
}

function PokemonStatusCase({ state }: { state: Partial<PokemonState> }): ReactElement {
  switch (state.status) {
    case PokemonLoadingStatus.Loading:
      return <>Loading, please wait</>
    case PokemonLoadingStatus.Success:
      return <PokemonDisplay pokemon={state.pokemon!} />
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
      <Grid item xs={4} md={3} className="flex justify-center items-center bg-green-200" style={{
        paddingTop: '1%',
        flexDirection: 'column'
      }}>
        {/* TODO: stick to right */}
        <div className="flex flex-row p-2" style={{ width: '80%', justifyContent: 'flex-end', cursor: 'pointer' }} onClick={() => setShowShiny(!showShiny)}>
          {showShiny ? <StarNo /> : <Star />}
        </div>
          <Image
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
          {pokemon.types.map((t) => <Image
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
        Stats
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