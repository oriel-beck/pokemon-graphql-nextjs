"use client"

import Image from "next/image";
import { KeyboardEventHandler, useState } from "react";
import { Search, SearchIconWrapper, StyledInputBase } from "@components/search/search";
import { Box, Button, Container, IconButton, Menu, Toolbar, Typography, AppBar, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "@app/redux/hooks";
import { setSearch } from "@app/redux/features/searchSlice";

const pages = ["Pokemon", "Abilities", "Moves", "Items"];

export function Header() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const search = useAppSelector((state) => state.searchReducer);
    const dispatch = useAppDispatch();

    const updateSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        dispatch(setSearch({
            key: "pokemon",
            value: event.currentTarget.value
        }))
    }

    const startSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key != "Enter") return;
        // TODO: search by route
        return;
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
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            // TODO: use the route to determine which key of searchState it's using
                            defaultValue={search.pokemon}
                            onKeyDown={updateSearch}
                            onKeyUp={startSearch}
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                </Toolbar>
            </Container>
        </AppBar>
    )
}