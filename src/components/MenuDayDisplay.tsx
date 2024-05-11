// display 3 meals for the day: breakfast, lunch, dinner

import { Card, CardContent, Paper, Stack, Typography } from "@mui/material"
import { Day, type MenuDay } from "../models/models"
import MenuItemDisplay from "./MenuItemDisplay"

interface MenuDayProps {
    menuDay: MenuDay
}

export default function MenuDayDisplay({ menuDay }: MenuDayProps) {

    const renderMenuItems = () => {

        const breakfast = menuDay.menuItems.find(item => item.mealType === "Breakfast")

        const lunch = menuDay.menuItems.find(item => item.mealType === "Lunch")

        const dinner = menuDay.menuItems.find(item => item.mealType === "Dinner")

        return (
            <Card sx={{ minWidth: 150 }}>
                <CardContent>
                    <Stack spacing={1}>
                        <Typography variant="h4">{Day[menuDay.day]}</Typography>
                        <MenuItemDisplay menuItem={breakfast!} />
                        <MenuItemDisplay menuItem={lunch!} />
                        <MenuItemDisplay menuItem={dinner!} />
                    </Stack>
                </CardContent>
            </Card>
        )
    }

    return (
        <>{renderMenuItems()}</>
    )
}