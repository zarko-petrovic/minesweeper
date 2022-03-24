import React from 'react';
import { Button, Grid, Typography } from '@mui/material';

import { MineField } from '../MineField/MineField';
import { useAppSelector } from '../../app/hooks';
import { webSocket } from '../../app/webSocket';
import {
  selectMineFieldsValues,
  selectMineFieldsStatus,
  selectMineFieldsLevel
} from './mineFieldsSlice';

export const MineFields = () => {
  const mines = useAppSelector(selectMineFieldsValues);
  const status = useAppSelector(selectMineFieldsStatus);
  const level = useAppSelector(selectMineFieldsLevel);

  const handleRefresh = () => {
    webSocket.send(`new ${level}`);
  };

  const handleStatus = () => {
    switch (status) {
      case 'win':
        return (
          <Typography variant='h6' component='div' color='green'>
            You win. Congratulations!
          </Typography>
        );
      case 'lose':
        return (
          <Typography variant='h6' component='div' color='crimson'>
            You lost!
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <Grid container direction='column' justifyContent='center' alignItems='center'>
      <Grid item>
        <Grid container direction='column' justifyContent='center' alignItems='center'>
          {mines.map((row, i) => (
            <Grid key={i} item>
              {row.map((cell, j) => (
                <MineField key={j} i={i} j={j} cell={cell} />
              ))}
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item sx={{
        mt: 2
      }}>
        <Button
          variant='contained'
          color='primary'
          onClick={handleRefresh}>
          Refresh
        </Button>
      </Grid>
      <Grid item sx={{
        mt: 2
      }}>
        {handleStatus()}
      </Grid>
    </Grid>
  );
};