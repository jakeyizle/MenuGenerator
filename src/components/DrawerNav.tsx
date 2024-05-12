import { RestaurantMenu, Edit, Info } from "@mui/icons-material";
import { Drawer, Toolbar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";

interface DrawerNavProps {
    drawerWidth: number
    onClick: (name: string) => void
}
export default function DrawerNav({ drawerWidth, onClick }: DrawerNavProps) {

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {['Menu', 'Manage Recipes'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={() => onClick(text)}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <RestaurantMenu /> : <Edit />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['About'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={() => onClick(text)}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <Info /> : <></>}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}
