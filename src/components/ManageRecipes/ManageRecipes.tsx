// landing point for CRUD operations on recipes

import { useEffect, useState } from "react";
import { deleteRecipe, getRecipe, getRecipeNames } from "../../database/database";
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import AddRecipeForm from "./AddRecipeForm";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { AddCircleOutline, RestaurantMenu } from "@mui/icons-material";
import { Recipe } from "../../models/models";
interface ManageRecipesProps {

}


export const ManageRecipes = (props: ManageRecipesProps) => {
    const [recipeNames, setRecipeNames] = useState<string[]>();
    const [fetchCounter, setFetchCounter] = useState(0);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe>();
    useEffect(() => {
        const fetchRecipes = async () => {
            setRecipeNames(await getRecipeNames())
        }
        fetchRecipes()
    }, [fetchCounter])

    const handleAddClick = () => {
        setAddModalOpen(true)
    }

    const handleModalClose = (submit?: boolean) => {
        if (submit) {
            setFetchCounter(fetchCounter + 1)
        }
        setSelectedRecipe(undefined)
        setAddModalOpen(false)
    }

    const handleListClick = (name: string) => {
        getRecipe(name).then((recipe) => {
            if (!recipe) return
            setSelectedRecipe(recipe)
            setAddModalOpen(true)
        })
    }

    const handleDelete = () => {
        const name = selectedRecipe?.name
        if (!name) return
        deleteRecipe(name).then(() => {
            setAddModalOpen(false)
            setFetchCounter(fetchCounter + 1)
            setSelectedRecipe(undefined)
        })
    }

    const renderRecipes = () => {
        if (!recipeNames) {
            return <Typography variant="subtitle1">No recipes found</Typography>
        }
        return recipeNames.map((name) => {
            return (
                <ListItem key={name}>
                    <ListItemButton onClick={() => { handleListClick(name) }}>
                        <ListItemIcon><RestaurantMenu /></ListItemIcon>
                        <ListItemText primary={name} />
                    </ListItemButton>
                </ListItem>
            )
        })
    }

    return (
        <>
            <AddRecipeForm isOpen={addModalOpen} onClose={handleModalClose} onDelete={handleDelete} recipe={selectedRecipe} />

            <Grid spacing={2} container>
                <Grid xs={2}>
                    <Typography variant="h4">Manage Recipes</Typography>
                </Grid>
                <Grid>
                    <IconButton onClick={handleAddClick}><AddCircleOutline /></IconButton>
                </Grid>
            </Grid>
            <Box sx={{ width: '50%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <List>
                    {renderRecipes()}
                </List>
            </Box>
        </>
    )
}