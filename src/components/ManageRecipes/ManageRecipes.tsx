// landing point for CRUD operations on recipes

import { useEffect, useState } from "react";
import { deleteRecipe, getRecipe, getRecipes } from "../../database/database";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import AddRecipeForm from "./AddRecipeForm";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { AddCircleOutline, Edit,  } from "@mui/icons-material";
import { Recipe } from "../../models/models";
interface ManageRecipesProps {

}


export const ManageRecipes = (props: ManageRecipesProps) => {
    const [recipes, setRecipes] = useState<Recipe[]>();
    const [fetchCounter, setFetchCounter] = useState(0);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe>();
    useEffect(() => {
        const fetchRecipes = async () => {
            setRecipes(await getRecipes())
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

    const renderTableRecipes = () => {
        return recipes?.map((recipe) => {
            return (
                <TableRow key={recipe.name}>
                    <TableCell><IconButton onClick={() => { handleListClick(recipe.name) }}><Edit /></IconButton>{recipe.name}</TableCell>
                    <TableCell>
                        {recipe.mealNumber ?? 0}
                    </TableCell>
                    <TableCell>
                        {recipe.ingredients?.length ?? 0}
                    </TableCell>
                </TableRow>
            )
        })
    }

    const renderRecipeTable = () => {
        if (!recipes) {
            return <Typography variant="subtitle1">No recipes found</Typography>
        }
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Recipe Name</TableCell>
                            <TableCell>Meal Count</TableCell>
                            <TableCell># of Ingredients</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderTableRecipes()}
                    </TableBody>
                </Table>
            </TableContainer>
        )
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

            {renderRecipeTable()}
        </>
    )
}