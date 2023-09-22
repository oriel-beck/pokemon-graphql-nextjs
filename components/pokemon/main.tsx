import { Star } from "@icons/star";
import { StarNo } from "@icons/star-no";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { PokemonTabs } from "./tabs";
import Image from "next/image";
import type { Pokemon } from "@utils/pokemon/class";

export function PokemonDisplay({ pokemon }: { pokemon: Pokemon }) {
    const [showShiny, setShowShiny] = useState(false);

    function showSprite() {
        return showShiny ? pokemon.shinySprite : pokemon.sprite;
    }

    return (
        <Grid container spacing={{ xs: 1, md: 1, }} columns={{ xs: 4, md: 9 }} className="mt-auto">
            <Grid item xs={4} md={3} className="flex justify-center items-center bg-green-200" style={{
                paddingTop: '1%',
                flexDirection: 'column',
                minHeight: '27rem',
                maxHeight: '27rem'
            }}>
                {/* TODO: stick to right */}
                <div className="flex flex-row p-2" style={{ width: '80%', height: '80%', justifyContent: 'flex-end' }}>
                    <span onClick={() => setShowShiny(!showShiny)} style={{ cursor: 'pointer' }}>
                        {showShiny ? <StarNo /> : <Star />}
                    </span>
                </div>
                <Image
                style={{
                    maxWidth: 150
                }}
                    src={showSprite()}
                    alt={pokemon.pokemon.name}
                    height={400}
                    width={200}
                />
                {/* TODO: decrease margin top of image and everything for mobile */}
                <div className="bg-blue-700 p-4 rounded-md flex text-white mt-10 mb-12">
                    <Typography variant="h5" component="h3">
                        {pokemon.pokemon.name[0].toUpperCase() + pokemon.pokemon.name.substring(1)}
                    </Typography>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    {/* TODO: recalculate using the better data */}
                    {/* {pokemon.types.map((t) => <img
                        key={t.name}
                        src={`/${t.name.toLowerCase()}.png`}
                        alt={t.name}
                        height={45}
                        width={45}
                        style={{
                            marginBottom: '2rem',
                            maxHeight: '45px'
                        }}
                    />)} */}
                </div>
            </Grid>
            <Grid item xs={4} md={6}>
                <PokemonTabs pokemon={pokemon} />
            </Grid>
        </Grid>
    )
}