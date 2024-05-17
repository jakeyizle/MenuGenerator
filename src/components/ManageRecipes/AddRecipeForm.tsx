import { Label } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Modal, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Add } from "@mui/icons-material";
import IngredientForm from "./IngredientForm";
import MealTypePicker from "./MealTypePicker";
import { Ingredient, ValidMealTypes } from "../../models/models";
import MealTypeCheckboxGroup from "./MealTypeCheckboxGroup";
import { addRecipe } from "../../database/database";
// a recipe has 1 name, n number of ingredients, and has at least 1 meal type (breakfast, lunch, dinner)

interface AddRecipeFormProps {
    isOpen: boolean,
    onClose: (submit?: boolean) => void
}

export default function AddRecipeForm({ isOpen, onClose }: AddRecipeFormProps) {
    return (
        <Dialog open={isOpen} onClose={() => onClose(false)} PaperProps={{
            component: 'form',
            onSubmit: (e: any) => {
                e.preventDefault()
                addRecipe(new FormData(e.currentTarget))                
                onClose(true)
            }
        }}>
            <DialogTitle>Add Recipe</DialogTitle>
            <DialogContent dividers={true}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField id="recipe-name" label="Name" name="recipeName" type="name" variant="outlined" required />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField id="number-meals" label="Meals" name="meals" variant="outlined" type="number" defaultValue={1}
                            required
                            inputProps={{ min: 1 }}
                            InputLabelProps={{
                                shrink: true,
                            }} />
                    </Grid>
                </Grid>
                <Divider>Ingredients</Divider>
                <IngredientForm key="form" ></IngredientForm>
                <Divider>Meals</Divider>
                <MealTypeCheckboxGroup />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose(false)}>Cancel</Button>
                <Button type="submit">Add</Button>
            </DialogActions>
        </Dialog >
    )

}