import { Stack, Typography } from "@mui/material"
import { MenuItem } from "../models/models"

interface MenuItemDisplayProps {
    menuItem: MenuItem
}

export default function MenuItemDisplay({ menuItem }: MenuItemDisplayProps) {

    return (
        <Stack spacing={0}>
            <Typography variant="subtitle2">
                {menuItem.mealType}
            </Typography>
            <Typography variant="subtitle1">
                {menuItem.recipe.name}
            </Typography>
        </Stack>
    )
}