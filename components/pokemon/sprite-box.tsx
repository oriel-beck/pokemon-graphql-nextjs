import { Star } from "@icons/star";
import { StarNo } from "@icons/star-no";
import { Pokemon } from "@utils/pokemon/class";
import { useState } from "react";
import Image from "next/image";

export function Sprite({ pokemon }: { pokemon: Pokemon }) {
    const [showShiny, setShowShiny] = useState(false);

    function showSprite() {
        return showShiny ? pokemon.shinySprite : pokemon.sprite;
    }

    return (
        <>
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
            <div className="flex flex-row">
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
        </>
    )
}