import { useEffect, useState } from 'react';
import { Alert, CircularProgress, Stack, Typography } from '@mui/material';
import MenuDisplay from './Menu/MenuDisplay';
import { createMenu } from "../helpers/menuGenerator"
import { aggregateIngredients } from '../helpers/ingredientAggregator';
import { IngredientListDisplay } from './IngredientListDisplay';
import { Menu } from '../models/models';

function MenuIngredientDisplay() {
  const [menu, setMenu] = useState<Menu | undefined>()
  const [fetchErr, setFetchErr] = useState(false)
  const ingredientAggregate = menu ? aggregateIngredients(menu) : []
  useEffect(() => {
    const fetchMenu = async () => {
      let fetchCount = 0
      let _menu
      while (!_menu && fetchCount < 5) {
        fetchCount++
        _menu = await createMenu()
      }
      if (!menu) setFetchErr(true)
      setMenu(_menu)
    }
    fetchMenu()
  }, [])

  const renderFetchError = () => {
    return (
      <>{fetchErr && <Alert severity="error">There was an error creating your menu. Please try again.</Alert>}</>
    )
  }
  return (
    <>
      {menu ?
        <Stack spacing={2}>
          <Typography variant="h4">Menu</Typography>
          <MenuDisplay menu={menu}></MenuDisplay>
          <Typography variant="h4">Ingredients</Typography>
          <IngredientListDisplay ingredients={ingredientAggregate}></IngredientListDisplay>
        </Stack> : <>
          {renderFetchError()}
          <CircularProgress /></>}
    </>
  );
}

export default MenuIngredientDisplay;
