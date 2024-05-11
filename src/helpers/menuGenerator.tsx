// create 3 meals per day, 7 days in a week
// every day has 1 breakfast, 1 lunch, 1 dinner

import { MenuItem, Day, MenuDay, Menu } from "../models/models"
import { FAKE_RECIPES } from "../fakeData/fakeRecipes"

export const generateMenu = (): Menu => {

    const menu: Menu = []

    for (let i = 0; i < 7; i++) {

        const breakfast = getRadomItemFromList(FAKE_RECIPES)

        const lunch = getRadomItemFromList(FAKE_RECIPES)

        const dinner = getRadomItemFromList(FAKE_RECIPES)

        const menuItems: MenuItem[] = []
        menuItems.push({
            recipe: breakfast,
            mealType: "Breakfast",
        })

        menuItems.push({
            recipe: lunch,
            mealType: "Lunch",
        })

        menuItems.push({
            recipe: dinner,
            mealType: "Dinner",
        })

        const menuDay: MenuDay = {
            menuItems: menuItems,
            day: i as Day
        }

        menu.push(menuDay)
    }

    return menu
}

const getRadomItemFromList = (list: any[]) => {
    return list[Math.floor(Math.random() * list.length)]
}