// landing point for CRUD operations on recipes

import { useEffect, useMemo, useState } from "react";
import { getRecipeNames, getRecipes } from "../../database/database";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import AddRecipeForm from "./AddRecipeForm";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { AddCircleOutline } from "@mui/icons-material";
interface ManageRecipesProps {

}


export const ManageRecipes = (props: ManageRecipesProps) => {
    const [recipes, setRecipes] = useState<string[]>();
    const [fetchCounter, setFetchCounter] = useState(0);
    const [addModalOpen, setAddModalOpen] = useState(false);

    useEffect(() => {
        const fetchRecipes = async () => {
            setRecipes(await getRecipeNames())
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
        setAddModalOpen(false)
    }

    const renderRecipes = () => {
        if (!recipes) {
            return <></>
        }
        return recipes.map((recipe) => {
            return (
                <Box key={recipe}>
                   {recipe}
                </Box>
            )
        })
    }

    return (
        <>
            <AddRecipeForm isOpen={addModalOpen} onClose={handleModalClose}/>

            <Grid spacing={2} container>
            <Grid xs={2}>
                    <Typography variant="h4">Manage Recipes</Typography>
                </Grid>
                <Grid>
                    <IconButton onClick={handleAddClick}><AddCircleOutline /></IconButton>
                </Grid>
            </Grid>
            {renderRecipes()}
        </>
    )
}