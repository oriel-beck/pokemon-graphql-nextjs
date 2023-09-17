import { TableCell, TableRow } from "@mui/material";
import Image from "next/image";

export function mapEffectivenessToTableCells(types: Record<string, number>) {
    let num = 0;
    const arr = [];
    const keys = Object.keys(types);
    const values = Object.values(types);
    while (!!keys.length) {
        const tmpkeys = [];
        for (const key of keys.splice(0, 9)) {
            tmpkeys.push(
                <TableCell align="center" key={++num}>
                    <Image
                        src={`/${key}.png`}
                        alt={key}
                        height={45}
                        width={45}
                    />
                </TableCell>
            )
        }

        arr.push(<TableRow key={++num} >{tmpkeys}</TableRow>);

        const tmpvalues = [];
        for (const value of values.splice(0, 9)) {
            tmpvalues.push(
                <TableCell align="center" key={++num}>
                    {value}
                </TableCell>
            )

        }

        arr.push(<TableRow key={++num}>{tmpvalues}</TableRow>);
    }

    return arr;
}