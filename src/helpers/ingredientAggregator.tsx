import { Ingredient, Menu } from "../models/models";

export const aggregateIngredients = (menu: Menu): Ingredient[] => {
    const ingredients = menu.map(menuDay => {
        return menuDay.menuItems.map(menuItem => {
            return menuItem.recipe.ingredients
        })
    }).flat().flat()
    const uniqueIngredients = getUnqiueIngredients(ingredients)
    const aggregateIngredients = uniqueIngredients.map(ingredient => {
        return {
            name: ingredient.name,
            quantity: ingredients.filter(i => i.name === ingredient.name).reduce((sum, i) => sum + i.quantity, 0),
        }
    })
    // sort by descending amount
    return aggregateIngredients.sort((a, b) => b.quantity - a.quantity)
}

// takes a list of ingredients and returns a list of unique name combinations
const getUnqiueIngredients = (ingredients: Ingredient[]): Ingredient[] => {
    const uniqueIngredients = ingredients.filter((ingredient, index) => ingredients.findIndex(i => i.name === ingredient.name) === index)
    return uniqueIngredients
}

