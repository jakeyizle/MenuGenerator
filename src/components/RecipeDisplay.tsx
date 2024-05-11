import type {Recipe} from "../models/models"
interface RecipeDisplayProps {
    recipe: Recipe
}

export default function RecipeDisplay({ recipe }: RecipeDisplayProps) {

    return (
        <div>
            <h4>{recipe.name}</h4>
        </div>
    )
}