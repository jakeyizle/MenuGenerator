import { Delete } from "@mui/icons-material"
import { Grid, IconButton, TextField } from "@mui/material"
import { useEffect, useState } from "react"

interface IngredientInputProps {
    onDelete: () => void
    nameSuffix: string
    renderDeleteButton: boolean
}

export default function IngredientInput({ onDelete, nameSuffix, renderDeleteButton }: IngredientInputProps) {
    const [quantity, setQuantity] = useState<string | number>('')
    const [isQuantityError, setIsQuantityError] = useState(false)
    const [name, setName] = useState('')
    const [isNameError, setIsNameError] = useState(false)

    const handleQuantityChange = (target: string) => {
        const newMealNumber = parseFloat(target)
        if (Number.isNaN(newMealNumber)) {
            return
        }
        if (newMealNumber < 0) return
        setQuantity(newMealNumber)
    }
    const handleQuantityBlur = () => {
        if (typeof quantity === 'string' || quantity < 0) {
            setIsQuantityError(true)
        }
        else {
            setIsQuantityError(false)
        }
    }

    const handleNameBlur = () => {
        if (name === '') {
            setIsNameError(true)
        }
        else {
            setIsNameError(false)
        }
    }


    return (<>
        <Grid item xs={2} ><TextField id="ingredient-quantity" name={'ingredientQuantity' + nameSuffix} label="#" variant="outlined" type="number" value={quantity} onChange={(e) => handleQuantityChange(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
        /></Grid>
        <Grid item xs={renderDeleteButton ? 6 : 10} ><TextField id="ingredient-name" name={'ingredientName' + nameSuffix} label="Ingredient" variant="outlined"
            required
        />
        </Grid>
        {renderDeleteButton && <Grid item xs={4}><IconButton aria-label="delete" onClick={onDelete}><Delete /></IconButton></Grid>}
    </>
    )
}

