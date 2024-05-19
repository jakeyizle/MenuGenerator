import { Add } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import { useMemo, useState } from 'react';
import IngredientInput from './IngredientInput';
import { Ingredient } from '../../models/models';


const initialKeys = [new Date().getTime().toString()]

interface IngredientFormProps {
    ingredients: Ingredient[];
}

export default function IngredientForm({ ingredients }: IngredientFormProps) {
    const [ingredientKeys, setIngredientKeys] = useState<string[]>(ingredients.length > 0 ? ingredients.map((ingredient) => ingredient.name) : initialKeys);

    const ingredientInputs = useMemo(() => {
        const handleDeleteIngredient = (key: string) => {
            setIngredientKeys(ingredientKeys.filter(k => k !== key));
        }
        return ingredientKeys.map((key) => {
            const defaultName = ingredients.find((ingredient) => ingredient.name === key)?.name
            const defaultQuantity = ingredients.find((ingredient) => ingredient.name === key)?.quantity
            return <IngredientInput key={key}
                defaultName={defaultName} defaultQuantity={defaultQuantity}
                nameSuffix={key.toString()}
                onDelete={() => handleDeleteIngredient(key)}
                renderDeleteButton={ingredientKeys.length > 1} />
        })
    }, [ingredientKeys, ingredients])

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
        const key = new Date().getTime().toString();
        setIngredientKeys([...ingredientKeys, key]);
    }

    return (
        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2} key={'new-ingredient'}>
            {ingredientInputs}
            {renderAddButton()}
        </Grid>
    )
}