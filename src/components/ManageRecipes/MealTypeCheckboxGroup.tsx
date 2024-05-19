import { Checkbox, FormControlLabel, Grid, Stack } from "@mui/material"
import { ValidMealTypes } from "../../models/models"

interface MealTypeCheckboxGroupProps {  
    validMealTypes?: ValidMealTypes
}

export default function MealTypeCheckboxGroup({ validMealTypes }: MealTypeCheckboxGroupProps) {

    return (
        <Stack spacing={2}>
                    <Grid container
                        justifyContent="space-evenly"
                        alignItems="center">
                        <Grid item >
                            <FormControlLabel control={<Checkbox defaultChecked name="breakfast" />} label="Breakfast" />
                        </Grid>
                        <Grid item >
                            <FormControlLabel control={<Checkbox defaultChecked name="lunch" />} label="Lunch" />
                        </Grid>
                        <Grid item>
                            <FormControlLabel control={<Checkbox defaultChecked name="dinner" />} label="Dinner" />
                        </Grid>
                    </Grid>
                    <Grid container
                        justifyContent="space-evenly"
                        alignItems="center">
                        <Grid item >
                            <FormControlLabel control={<Checkbox name="snack" />} label="Snack" />
                        </Grid>
                        <Grid item >
                            <FormControlLabel control={<Checkbox name="dessert" />} label="Dessert" />
                        </Grid>
                    </Grid>
        </Stack>
    )
}