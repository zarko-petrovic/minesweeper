import React from 'react';
import { Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { webSocket } from '../../app/webSocket';
import {
  selectMineFieldsFlaggedBombs,
  updateMineFieldsFlaggedBomb
} from '../../features/mineFields/mineFieldsSlice';

interface MineFieldProps {
  i: number;
  j: number;
  cell: string
}

export const MineField = (props: MineFieldProps) => {
  const { i, j, cell } = props;
  const flaggedBombs = useAppSelector(selectMineFieldsFlaggedBombs);
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (event.button === 2) {
      dispatch(updateMineFieldsFlaggedBomb({ i, j }));
    } else if (!flaggedBombs[i][j]) {
      webSocket.send(`open ${j} ${i}`);
    }
  };

  return (
    <Button
      sx={{
        width: 30,
        height: 30
      }}
      variant={flaggedBombs[i][j] ? 'contained' : 'outlined'}
      color={flaggedBombs[i][j] ? 'error' : 'primary'}
      onClick={handleClick}
      onContextMenu={handleClick}
      disabled={cell !== ''}>
      {cell}
    </Button>
  );
};