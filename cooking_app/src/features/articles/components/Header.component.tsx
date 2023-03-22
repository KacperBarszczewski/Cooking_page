import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar, Badge, Box, Button, Toolbar } from '@mui/material';

import { logout, selectedUser } from '../../auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/input/redux/hooks';

const HeaderComponent = () => {
  const { user } = useAppSelector(selectedUser);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();


  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        sx={{ backgroundColor: '#131921', color: 'white', padding: '4px' }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div><h2>Cooking Page</h2></div>
            <div style={{ display: 'flex' }}>
                <div>
                    <div>Czejść, {user?.name}</div>
                    <Button
                        onClick={logoutHandler}
                        sx={{ padding: 0, marginRight: '16px' }}
                        color='inherit'
                    >
                        Wyloguj się
                    </Button>
                </div>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderComponent;