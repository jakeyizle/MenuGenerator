import { Grid } from "@mui/material";
import { Ingredient } from "../models/models";

interface IngredientListDisplayProps {
    ingredients: Ingredient[]
}

export const IngredientListDisplay = (props: IngredientListDisplayProps) => {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {props.ingredients.map((ingredient, index) => {
                return <Grid item xs={2} sm={4} md={4} key={index}>{ingredient.name} {ingredient.amount} {ingredient.unit}</Grid>
            })}
        </Grid>
    )
}