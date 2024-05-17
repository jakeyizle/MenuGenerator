// future - implement database with localforage
// for now - in memory array of objects

import { Ingredient, Recipe, ValidMealTypes } from "../models/models";
import * as localForage from "localforage";



export const getRecipes = async () => {
    const recipes: Recipe[] = []
    await localForage.iterate((recipe, name) => {
        recipes.push(recipe as Recipe)
    })
    return recipes
}

export const getRecipeNames = async () => {
    return await localForage.keys()
}


export const addRecipe = (formData: FormData) => {
    const name = formData.get('recipeName') as string
    const mealNumber = formData.get('meals') as string
    let currentIngredient = {
        quantity: 0,
        name: '',
    }
    const ingredients: Ingredient[] = [];
    for (const [key, value] of formData.entries()) {
        if (currentIngredient.name && currentIngredient.quantity) {
            ingredients.push(currentIngredient)
            currentIngredient = {
                quantity: 0,
                name: '',
            }
        }
        if (key.startsWith('ingredientQuantity')) {
            currentIngredient.quantity = parseFloat(value as string)
        } else if (key.startsWith('ingredientName')) {
            currentIngredient.name = value as string
        }
    }
    const validMealTypes: ValidMealTypes = {
        breakfast: !!formData.get('breakfast'),
        lunch: !!formData.get('lunch'),
        dinner: !!formData.get('dinner'),
        snack: !!formData.get('snack'),
        dessert: !!formData.get('dessert'),
    }

    const recipe = {
        name,
        mealNumber: mealNumber ? parseInt(mealNumber) : 0,
        ingredients,
        validMealTypes,
    }    
    localForage.setItem(recipe.name, recipe)    
}

