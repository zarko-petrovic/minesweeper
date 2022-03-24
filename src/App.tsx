import React from 'react';
import { Box } from '@mui/material';

import { TopBar } from './features/TopBar/TopBar';
import { MineFields } from './features/mineFields/MineFields';

export const App = () => {

  return (
    <Box sx={{
      overflow: 'auto',
      whiteSpace: 'nowrap'
    }}>
      <TopBar />
      <Box mt={12}>
        <MineFields />
      </Box>
    </Box>
  );
}
