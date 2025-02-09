import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery
} from '@mui/material';

import { menuItems } from '../../utils/constants';
import { Icons } from './icons';

export const NavBar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          borderBottom: '1px solid #ccc',
          background: '#ffffff'
        }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="black"
            aria-label="menu"
            onClick={toggleDrawer}>
            <Icons.menu/>
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1, color: 'black' }}>
            TravelAssistance
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {menuItems.map((item) => (
                <Button
                  startIcon={<item.icon.type sx={{ color: 'primary.main' }} />}
                  key={item.text}
                  variant="outlined"
                  sx={{
                    color: 'black',
                    borderRadius: '20px',
                    border: '1px solid #ccc',
                    '&:hover': {
                      color: 'primary.main'
                    }
                  }}>
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
