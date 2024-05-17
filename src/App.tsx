import { Box, Toolbar, Typography } from '@mui/material';
import MenuIngredientDisplay from './components/MenuIngredientDisplay';
import AppBar from '@mui/material/AppBar';

import { useState } from 'react';
import DrawerNav from './components/DrawerNav';
import { ManageRecipes } from './components/ManageRecipes/ManageRecipes';


const drawerWidth = 240;

function App() {
  const [activeWindow, setActiveWindow] = useState("Menu");

  const handleNavClick = (name: string) => {
    setActiveWindow(name);
  }

  const renderActiveWindow = () => {
    switch (activeWindow) {
      case "Menu":
        return <MenuIngredientDisplay></MenuIngredientDisplay>
      case "Manage Recipes":
        return <ManageRecipes />
      case "About":
        return <div>About</div>
      default:
        return <MenuIngredientDisplay></MenuIngredientDisplay>
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Menu Maker
          </Typography>
        </Toolbar>
      </AppBar>
      <DrawerNav drawerWidth={drawerWidth} onClick={handleNavClick}></DrawerNav>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {renderActiveWindow()}
      </Box>

    </Box>
  );
}

export default App;
