"use client"

import { Popover, Typography } from "@mui/material"
import { PokemonV2Pokemonability } from "@utils/pokemon/query"
import Link from "next/link";
import { useState } from "react";

export function StatsAbility({ ability }: { ability: PokemonV2Pokemonability }) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <li className="text-blue-500 mb-1">
            <Link href={`/abilities/${ability.pokemon_v2_ability.name}`}>
                <Typography
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                >
                    {ability.pokemon_v2_ability.name} {ability.is_hidden ? '(hidden)' : <></>}
                </Typography>
            </Link>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{ p: 1 }}>{ability.pokemon_v2_ability.pokemon_v2_abilityeffecttexts[0].short_effect}</Typography>
            </Popover>
        </li>
    )
}