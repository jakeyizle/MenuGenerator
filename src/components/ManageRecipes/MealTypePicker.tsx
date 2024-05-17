import { Button, Grid, Stack } from "@mui/material";
import { useState } from "react";
import { ValidMealTypes } from "../../models/models";

const InitialMealType: ValidMealTypes = {
    breakfast: false,
    lunch: false,
    dinner: false,
    snack: false,
    dessert: false
};

interface MealTypePickerProps {
    onChange: (mealTypes: ValidMealTypes) => void
}
export default function MealTypePicker({ onChange }: MealTypePickerProps) {
    const [mealTypes, setMealTypes] = useState<ValidMealTypes>(InitialMealType);

    const getVariant = (mealType: string) => {
        return mealTypes[mealType] ? "contained" : "outlined"
    }

    const toggleMealType = (mealType: string) => {
        const newMealTypes = { ...mealTypes, [mealType]: !mealTypes[mealType] };
        setMealTypes(newMealTypes);
        onChange(newMealTypes);
    }

    return (
        <Stack spacing={2}>
            <Grid container
                justifyContent="space-evenly"
                alignItems="center">
                <Grid item >
                    <Button variant={getVariant('breakfast')} onClick={() => toggleMealType('breakfast')}>Breakfast</Button>
                </Grid>
                <Grid item >
                    <Button variant={getVariant('lunch')} onClick={() => toggleMealType('lunch')}>Lunch</Button>
                </Grid>
                <Grid item>
                    <Button variant={getVariant('dinner')} onClick={() => toggleMealType('dinner')}>Dinner</Button>
                </Grid>
            </Grid>
            <Grid container
                justifyContent="space-evenly"
                alignItems="center">
                <Grid item >
                    <Button variant={getVariant('snack')} onClick={() => toggleMealType('snack')}>Snack</Button>
                </Grid>
                <Grid item >
                    <Button variant={getVariant('dessert')} onClick={() => toggleMealType('dessert')}>Dessert</Button>
                </Grid>
            </Grid>
        </Stack>
    )
}