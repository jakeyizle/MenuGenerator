import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Stack } from "@mui/material"



export default function MealTypeCheckboxGroup() {

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