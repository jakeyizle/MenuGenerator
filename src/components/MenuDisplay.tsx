import { useEffect, useState } from "react"
import { generateMenu } from "../helpers/menuGenerator"
import MenuDayDisplay from "./MenuDayDisplay"
import Grid from "@mui/material/Unstable_Grid2/Grid2"

export default function MenuDisplay() {
    const [menu, setMenu] = useState(generateMenu())

    // render each day of the week
    const renderMenuDays = () => {
        const menuDays = []
        for (let i = 0; i < 7; i++) {
            const menuDay = menu.find(item => item.day === i)!
            menuDays.push(
                <Grid xs={1.5}>
                    <MenuDayDisplay key={i} menuDay={menuDay} />
                </Grid>
            )
        }
        return (
            <Grid container spacing={2}>
                {menuDays}
            </Grid>
        )
    }
    return (
        <>{renderMenuDays()}</>
    )
}