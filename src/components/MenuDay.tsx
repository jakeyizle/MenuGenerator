// display 3 meals for the day: breakfast, lunch, dinner

import { Day, type MenuDay } from "../models/models"
import MenuItemDisplay from "./MenuItemDisplay"

interface MenuDayProps {
    menuDay: MenuDay
}

export default function MenuDay({ menuDay }: MenuDayProps) {

    const renderMenuItems = () => {

        const breakfast = menuDay.menuItems.find(item => item.mealType === "Breakfast")

        const lunch = menuDay.menuItems.find(item => item.mealType === "Lunch")

        const dinner = menuDay.menuItems.find(item => item.mealType === "Dinner")

        return (
            <>
            <div>
                <h2>{Day[menuDay.day]}</h2>
            </div>
                <div>
                    <MenuItemDisplay menuItem={breakfast!} />
                </div>
                <div>
                <MenuItemDisplay menuItem={lunch!} />
                </div>
                <div>
                <MenuItemDisplay menuItem={dinner!} />
                </div>
            </>
        )
    }

    return (
        <>{renderMenuItems()}</>
    )
}