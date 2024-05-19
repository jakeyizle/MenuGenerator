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
                            <FormControlLabel control={<Checkbox defaultChecked={validMealTypes?.breakfast} name="breakfast" />} label="Breakfast" />
                        </Grid>
                        <Grid item >
                            <FormControlLabel control={<Checkbox defaultChecked={validMealTypes?.lunch} name="lunch" />} label="Lunch" />
                        </Grid>
                        <Grid item>
                            <FormControlLabel control={<Checkbox defaultChecked={validMealTypes?.dinner} name="dinner" />} label="Dinner" />
                        </Grid>
                    </Grid>
                    <Grid container
                        justifyContent="space-evenly"
                        alignItems="center">
                        <Grid item >
                            <FormControlLabel control={<Checkbox name="snack" defaultChecked={validMealTypes?.snack} />} label="Snack" />
                        </Grid>
                        <Grid item >
                            <FormControlLabel control={<Checkbox name="dessert" defaultChecked={validMealTypes?.dessert} />} label="Dessert" />
                        </Grid>
                    </Grid>
        </Stack>
    )
}