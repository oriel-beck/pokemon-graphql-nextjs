import { Star } from "@icons/star";
import { StarNo } from "@icons/star-no";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { PokemonTabs } from "./tabs";
import Image from "next/image";
import type { Pokemon } from "@utils/pokemon/class";
import { Sprite } from "./sprite-box";
import { StatsBars } from "./stats-bars";
import { Effectiveness } from "./effectiveness";

export function PokemonDisplay({ pokemon }: { pokemon: Pokemon }) {
    return (
        <Grid container spacing={{ xs: 1, md: 1, }} columns={{ xs: 4, md: 10 }} className="mt-auto" style={{ marginBottom: '65px' }}>
            <Grid item xs={4} md={4} className="flex items-center flex-col">
                <Sprite pokemon={pokemon} />
            </Grid>
            <Grid item xs={4} md={6}>
                <PokemonTabs pokemon={pokemon} />
            </Grid>
            <Grid item xs={4} md={4}>
                <StatsBars pokemon={pokemon} />
            </Grid>
            <Grid item xs={4} md={6}>
                <Effectiveness pokemon={pokemon} />
            </Grid>
        </Grid>
    )
}