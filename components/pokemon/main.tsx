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
            <Grid item xs={4} md={3} className="flex items-center flex-col">
                <div className="flex flex-row p-2" style={{ width: '100%', justifyContent: 'flex-end' }}>
                    <span onClick={() => setShowShiny(!showShiny)} style={{ cursor: 'pointer' }}>
                        {showShiny ? <StarNo /> : <Star />}
                    </span>
                </div>
                <Image
                    priority={true}
                    className=""
                    src={showSprite()}
                    alt={pokemon.pokemon.name}
                    height={200}
                    width={200}
                />
                <div className="flex flex-row m-5">
                    {pokemon.pokemon.pokemon_v2_pokemontypes.map((t) => <Image
                        key={t.pokemon_v2_type.name}
                        src={`/${t.pokemon_v2_type.name.toLowerCase()}.png`}
                        alt={t.pokemon_v2_type.name}
                        height={45}
                        width={45}
                        style={{
                            maxWidth: '45px'
                        }}
                        className="m-1"
                    />)}
                </div>
            </Grid>
            <Grid item xs={4} md={6}>
                <PokemonTabs pokemon={pokemon} />
            </Grid>
        </Grid>
    )
}