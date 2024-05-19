
export type Ingredient = {
    name: string
    quantity: number
    [key: string]: any;
}

export type Recipe = {
    name: string
    ingredients: Ingredient[]
    validMealTypes?: ValidMealTypes
    mealNumber?: number 
}

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert'

export type ValidMealTypes = {
    breakfast: boolean,
    lunch: boolean,
    dinner: boolean,
    snack: boolean,
    dessert: boolean,
    [key: string]: boolean
};


export enum Day {
    'Monday' = 0,
    'Tuesday' = 1,
    'Wednesday' = 2,
    'Thursday' = 3,
    'Friday' = 4,
    'Saturday' = 5,
    'Sunday' = 6
}
export type MenuItem = {
    recipe: Recipe
    mealType: MealType
}

export type Menu = MenuDay[]

export type MenuDay = {
    menuItems: MenuItem[]
    day: Day
}