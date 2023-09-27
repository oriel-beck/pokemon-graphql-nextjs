"use client"

import { Box, Divider, Grid, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { StatsPokedexDataTable } from "./stats/stats";
import type { Pokemon } from "@utils/pokemon/class";
import { StatsEffectiveness } from "./stats/effectiveness";
import { StatsBars } from "./stats/stats-bars";
import { StatsSprite } from "./stats/sprite-box";
import { StatsTrainingTable } from "./stats/training";
import { StatsBreedingTable } from "./stats/breeding";
import { AbilitiesAbilityTable } from "./abilities/abilities";

export function MainStats({ pokemon }: { pokemon: ReturnType<Pokemon['toJSON']> }) {
    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="Pokemon information tabs" textColor="primary" indicatorColor="secondary">
                    <Tab label="Stats" {...a11yProps(0)} className="placeholder-sky-50" />
                    <Tab label="Abilities" {...a11yProps(1)} />
                    <Tab label="Move-sets" {...a11yProps(2)} />
                </Tabs>
            </Box>
            {/* Stats */}
            <CustomTabPanel value={value} index={0}>
                <Grid container spacing={{ xs: 1, md: 1, }} columns={{ xs: 4, md: 10 }} className="mt-auto" style={{ marginBottom: '65px' }}>
                    <Grid item xs={4} md={3} className="flex items-center flex-col pb-4">
                        <StatsSprite pokemon={pokemon} />
                    </Grid>
                    <Grid item xs={4} md={3.5}>
                        <StatsPokedexDataTable pokemon={pokemon} />
                    </Grid>
                    <Grid item xs={4} md={3}>
                        <StatsTrainingTable pokemon={pokemon} />
                        <Divider />
                        <StatsBreedingTable pokemon={pokemon} />
                    </Grid>
                    <Grid item xs={4} md={4.5}>
                        <StatsBars pokemon={pokemon} />
                    </Grid>
                    {/* Divider */}
                    <Grid item xs={0} md={0.5}></Grid>
                    <Grid item xs={4} md={5}>
                        <StatsEffectiveness pokemon={pokemon} />
                    </Grid>
                </Grid>
            </CustomTabPanel>
            {/* Abilities */}
            <CustomTabPanel value={value} index={1}>
                <AbilitiesAbilityTable abilities={pokemon.pokemon.pokemon_v2_pokemonabilities} />
            </CustomTabPanel>
            {/* Move-sets */}
            <CustomTabPanel value={value} index={2}>
                Movesets
            </CustomTabPanel>
        </>
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
                    {/* <Typography> */}
                    {children}
                    {/* </Typography> */}
                </Box>
            )}
        </div>
    );
}
