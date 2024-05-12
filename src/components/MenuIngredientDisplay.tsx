import React, { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import MenuDisplay from './MenuDisplay';
import { generateMenu } from "../helpers/menuGenerator"
import { aggregateIngredients } from '../helpers/ingredientAggregator';
import { IngredientListDisplay } from './IngredientListDisplay';

function MenuIngredientDisplay() {
  const [menu, setMenu] = useState(generateMenu())
  const ingredientAggregate = aggregateIngredients(menu)
  console.log(ingredientAggregate)
  return (
    <Stack spacing={2}> 
      <Typography variant="h4">Menu</Typography>
      <MenuDisplay menu={menu}></MenuDisplay>
      <Typography variant="h4">Ingredients</Typography>
      <IngredientListDisplay ingredients={ingredientAggregate}></IngredientListDisplay>
    </Stack>
  );
}

export default MenuIngredientDisplay;
