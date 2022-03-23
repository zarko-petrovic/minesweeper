import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useAppDispatch } from '../../app/hooks';
import { webSocket } from '../../app/webSocket';
import { setMineFieldsLevel } from '../../features/mineFields/mineFieldsSlice';

const levels = [1, 2, 3, 4];

export const TopBar = () => {
  const dispatch = useAppDispatch();
  const [ anchorElNav, setAnchorElNav ] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClick = (level: number) => {
    dispatch(setMineFieldsLevel(level));
    webSocket.send(`new ${level}`);

    handleCloseNavMenu();
  };

  return (
    <AppBar position='absolute'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            Minesweeper
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}>
              {levels.map((level) => (
                <MenuItem key={level} onClick={() => handleClick(level)}>
                  <Typography textAlign='center'>{`Game ${level}`}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            Minesweeper
          </Typography>
          <Box ml={2} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {levels.map((level) => (
              <Button
                key={level}
                color='primary'
                onClick={() => handleClick(level)}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                {`Game ${level}`}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};