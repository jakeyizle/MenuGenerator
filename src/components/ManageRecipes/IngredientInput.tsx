import { Delete } from "@mui/icons-material"
import { Grid, IconButton, TextField } from "@mui/material"
import { useState } from "react"

interface IngredientInputProps {
    onDelete: () => void
    nameSuffix: string
    renderDeleteButton: boolean
    defaultQuantity?: number
    defaultName?: string
}

export default function IngredientInput({ onDelete, nameSuffix, renderDeleteButton, defaultQuantity, defaultName }: IngredientInputProps) {
    const [quantity, setQuantity] = useState<number>(defaultQuantity || 1)

    const handleQuantityChange = (target: string) => {
        const newMealNumber = parseFloat(target)
        if (Number.isNaN(newMealNumber)) {
            return
        }
        if (newMealNumber < 0) return
        setQuantity(newMealNumber)
    }
    return (<>
        <Grid item xs={2} ><TextField id="ingredient-quantity" name={'ingredientQuantity' + nameSuffix} label="#" variant="outlined" type="number" value={quantity} onChange={(e) => handleQuantityChange(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
        /></Grid>
        <Grid item xs={renderDeleteButton ? 6 : 10} ><TextField id="ingredient-name" name={'ingredientName' + nameSuffix} label="Ingredient" variant="outlined"
            required
            defaultValue={defaultName}
        />
        </Grid>
        {renderDeleteButton && <Grid item xs={4}><IconButton aria-label="delete" onClick={onDelete}><Delete /></IconButton></Grid>}
    </>
    )
}

