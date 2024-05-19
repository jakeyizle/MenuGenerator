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

export const getRecipe = async (name: string) => {
    return await localForage.getItem<Recipe>(name)
}

export const upsertRecipe = async (formData: FormData, defaultName?: string) => {
    try {
        const recipe = extractRecipeFromFormData(formData)
        if (defaultName) {
            recipe.name = defaultName
        }
        await localForage.setItem(recipe.name, recipe)
        return true
    }
    catch (e) {
        console.log(e)
        return false
    }
}

export const isRecipeUnique = async (formData: FormData) => {
    const name = formData.get('recipeName') as string
    return !(await localForage.getItem(name))
}

export const deleteRecipe = async (name: string) => {
    try {
        await localForage.removeItem(name)
        return true
    }
    catch (e) {
        console.log(e)
        return false
    }
}

const extractRecipeFromFormData = (formData: FormData): Recipe => {
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

    return {
        name,
        mealNumber: mealNumber ? parseInt(mealNumber) : 0,
        ingredients,
        validMealTypes,
    }
}

