import { MenuItem } from "../models/models"

interface MenuItemDisplayProps {
    menuItem: MenuItem
}

export default function MenuItemDisplay({ menuItem }: MenuItemDisplayProps) {

    return (
        <div>
            <h4><b>{menuItem.mealType}</b>: {menuItem.recipe.name}</h4>
        </div>
    )
}