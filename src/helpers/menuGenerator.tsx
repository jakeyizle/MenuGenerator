import { MenuItem, Day, MenuDay, Menu, Recipe, MealType } from "../models/models"
import { getRecipes } from "../database/database"

// Each day gets breakfast, lunch, and dinner
// Monday to Sunday - 7 days
// Each recipe can be used once
export const createMenu = async (): Promise<Menu | undefined> => {
    const recipes = await getRecipes()
    const breakfasts = recipes.filter((recipe) => recipe.validMealTypes?.breakfast)
    const lunches = recipes.filter((recipe) => recipe.validMealTypes?.lunch)
    const dinners = recipes.filter((recipe) => recipe.validMealTypes?.dinner)
    const menu: Menu = []
    const usedRecipes: Recipe[] = []
    const mealCounters = {
        breakfast: { count: 0, lastUsedRecipe: undefined as Recipe | undefined, mealType: "Breakfast" as MealType },
        lunch: { count: 0, lastUsedRecipe: undefined as Recipe | undefined, mealType: "Lunch" as MealType },
        dinner: { count: 0, lastUsedRecipe: undefined as Recipe | undefined, mealType: "Dinner" as MealType },
    }
    try {
        for (let i = 0; i < 7; i++) {
            const menuDay: MenuDay = { menuItems: [], day: i }
            const breakfast = getMenuItem(i, breakfasts, mealCounters.breakfast, usedRecipes)
            const lunch = getMenuItem(i, lunches, mealCounters.lunch, usedRecipes)
            const dinner = getMenuItem(i, dinners, mealCounters.dinner, usedRecipes)
            menuDay.menuItems.push(breakfast, lunch, dinner)
            menu.push(menuDay)
        }
        return menu
    } catch (e) {
        console.log(e)
    }
}

const getMenuItem = (day: Day, recipes: Recipe[], mealCounter: { count: number, lastUsedRecipe: Recipe | undefined, mealType: MealType }, usedRecipes: Recipe[]): MenuItem => {
    let recipe
    if (mealCounter.count > 0 && mealCounter.lastUsedRecipe) {
        recipe = mealCounter.lastUsedRecipe
        mealCounter.count--
    } else {
        const allowedRecipes = recipes.filter((recipe) => !usedRecipes.some((usedRecipe) => usedRecipe.name === recipe.name))
                    .filter((recipe) => (recipe.mealNumber ?? 0) + day <= 7)
        recipe = allowedRecipes[Math.floor(Math.random() * allowedRecipes.length)]
        mealCounter.lastUsedRecipe = recipe
        mealCounter.count = Math.max((recipe.mealNumber ?? 0) - 1, 0)
    }
    return {
        recipe,
        mealType: mealCounter.mealType,
    }
}
