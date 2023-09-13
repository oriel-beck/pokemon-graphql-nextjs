"use client"
import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'

import { Search, SearchIconWrapper, StyledInputBase } from "@components/search/search";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { SearchState, setSearch } from "@redux/features/search/searchSlice";

import { Box, Button, Container, IconButton, Menu, Toolbar, Typography, AppBar, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { fetchPokemonData } from "@redux/features/pokemon/pokemonSlice";

const pages = ["Pokemon", "Abilities", "Moves", "Items"];

export function Header() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const pathname = usePathname().substring(1) as keyof SearchState;

    const searchState = useAppSelector((state) => state.searchReducer);
    
    const [searchValue, setSearchValue] = useState<string>(searchState[pathname]);
    useEffect(() => setSearchValue(searchState[pathname]), [pathname]);
    
    const dispatch = useAppDispatch();

    const updateSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            dispatch(fetchPokemonData(searchValue))
        } else {
            dispatch(setSearch({
                key: pathname,
                value: event.currentTarget.value
            }));
        }
    }

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Image
                        src="/pokeball.png"
                        alt="logo"
                        width={45}
                        height={45}
                        className="mr-3"
                    />
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Link key={page} href={page.toLowerCase()}>
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    {page}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            // TODO: use the route to determine which key of searchState it's using
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                            onKeyUp={updateSearch}
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                </Toolbar>
            </Container>
        </AppBar>
    )
}