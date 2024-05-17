import { Add, Remove } from '@mui/icons-material';
import { FormGroup, Grid, IconButton, TextField } from '@mui/material';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import IngredientInput from './IngredientInput';
import { Ingredient } from '../../models/models';


const initialKeys = [new Date().getTime()]
export default function IngredientForm() {
    const [ingredientKeys, setIngredientKeys] = useState(initialKeys);

    const ingredientInputs = useMemo(() => {
        const handleDeleteIngredient = (key: number) => {
            setIngredientKeys(ingredientKeys.filter(k => k !== key));
        }

        return ingredientKeys.map((key) => {
            return <IngredientInput key={key} nameSuffix={key.toString()} onDelete={() => handleDeleteIngredient(key)} renderDeleteButton={ingredientKeys.length > 1} />
        })
    }, [ingredientKeys])

    const renderAddButton = () => {
        return (
            <Grid item key={'add-ingredient'}>
                <IconButton key={'add-ingredient-btn'} aria-label="add-ingredient" onClick={handleNewIngredient}>
                    <Add />
                </IconButton>
            </Grid>
        )
    }

    const handleNewIngredient = () => {
        const key = new Date().getTime();
        setIngredientKeys([...ingredientKeys, key]);
    }

    return (
        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2} key={'new-ingredient'}>
            {ingredientInputs}
            {renderAddButton()}
        </Grid>
    )
}