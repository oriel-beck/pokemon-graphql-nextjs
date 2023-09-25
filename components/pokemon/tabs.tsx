import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { StatsTable } from "./stats";
import type { Pokemon } from "@utils/pokemon/class";

export function PokemonTabs({ pokemon }: { pokemon: Pokemon }) {
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
            <CustomTabPanel value={value} index={0}>
                <StatsTable pokemon={pokemon} />
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
