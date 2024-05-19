import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from "@mui/material";
import { useState } from "react";
import IngredientForm from "./IngredientForm";
import { Recipe } from "../../models/models";
import MealTypeCheckboxGroup from "./MealTypeCheckboxGroup";
import { upsertRecipe, isRecipeUnique } from "../../database/database";
import DeleteIcon from '@mui/icons-material/Delete';
// a recipe has 1 name, n number of ingredients, and has at least 1 meal type (breakfast, lunch, dinner)

interface AddRecipeFormProps {
    isOpen: boolean,
    onClose: (submit?: boolean) => void
    recipe?: Recipe
    onDelete?: () => void
}

export default function AddRecipeForm({ isOpen, onClose, recipe, onDelete }: AddRecipeFormProps) {
    const [uniqueNameError, setUniqueNameError] = useState(false)
    const dialogTitle = recipe ? 'Edit Recipe' : 'Add Recipe'
    const isEditForm = !!recipe
    const defaultRecipeName = isEditForm ? recipe.name : ''
    const defaultMealNumber = isEditForm ? recipe.mealNumber : 1
    const defaultIngredients = isEditForm ? recipe.ingredients : []
    const defaultValidMealTypes = isEditForm ? recipe.validMealTypes : undefined

    const handleClose = () => {
        onClose(false)
        setUniqueNameError(false)
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} PaperProps={{
            component: 'form',
            onSubmit: (e: any) => {
                e.preventDefault()
                const form = new FormData(e.currentTarget)
                if (isEditForm) {
                    upsertRecipe(form, defaultRecipeName).then(() => onClose(true))
                } else {
                    isRecipeUnique(form).then((isUnique) => {
                        if (!isUnique) {
                            setUniqueNameError(true)
                            return
                        }
                        upsertRecipe(form).then(() => onClose(true))
                    })
                }

            }
        }}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent dividers={true}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField id="recipe-name" label="Name" name="recipeName" type="name" variant="outlined" required
                            defaultValue={defaultRecipeName} disabled={isEditForm}
                            error={uniqueNameError} helperText={uniqueNameError && "Name must be unique"} onClick={() => setUniqueNameError(false)} />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField id="number-meals" label="Meals" name="meals" variant="outlined" type="number" defaultValue={defaultMealNumber}
                            required
                            inputProps={{ min: 1 }}
                            InputLabelProps={{
                                shrink: true,
                            }} />
                    </Grid>
                </Grid>
                <Divider>Ingredients</Divider>
                <IngredientForm ingredients={defaultIngredients} key="form" ></IngredientForm>
                <Divider>Meals</Divider>
                <MealTypeCheckboxGroup validMealTypes={defaultValidMealTypes} />
            </DialogContent>
            <DialogActions>
                {isEditForm && <Grid container>
                    <Button variant="outlined" startIcon={<DeleteIcon />}
                        onClick={onDelete}>Delete</Button>
                </Grid>}
                <Button variant="outlined" onClick={() => onClose(false)}>Cancel</Button>

                <Button variant="contained" type="submit">Save</Button>

            </DialogActions>
        </Dialog >
    )

}