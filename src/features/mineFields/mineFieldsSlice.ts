import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type MineFieldsStatus =  'idle' | 'win' | 'lose' | 'failed';
export interface MineFieldsState {
  values: string[][];
  level: number;
  status: MineFieldsStatus;
  flaggedBombs: boolean[][];
};

export interface UpdatePayload {
  i: number;
  j: number;
};

export interface MineFieldsPayload {
  values: string[][];
  flaggedBombs: boolean[][];
};

const initialState: MineFieldsState = {
  values: [],
  level: 1,
  status: 'idle',
  flaggedBombs: []
};

export const mineFieldsSlice = createSlice({
  name: 'mineFields',
  initialState,
  reducers: {
    setMineFieldsValues: (state, action: PayloadAction<MineFieldsPayload>) => {
      const mines = action.payload.values;
      if (mines.every(row => row.every(mine => mine === ''))) {
        state.flaggedBombs = action.payload.flaggedBombs;
      }

      state.values = mines;
    },
    setMineFieldsLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
    setMineFieldsStatus: (state, action: PayloadAction<MineFieldsStatus>) => {
      state.status = action.payload;
    },
    updateMineFieldsFlaggedBomb: (state, action: PayloadAction<UpdatePayload>) => {
      const { i, j } = action.payload;
      const temp = !state.flaggedBombs[i][j];

      state.flaggedBombs[i][j] = temp;
    }
  }
});

export const { setMineFieldsValues, setMineFieldsLevel, setMineFieldsStatus, updateMineFieldsFlaggedBomb } = mineFieldsSlice.actions;

export const selectMineFieldsValues = (state: RootState) => state.mineFields.values;
export const selectMineFieldsLevel = (state: RootState) => state.mineFields.level;
export const selectMineFieldsStatus = (state: RootState) => state.mineFields.status;
export const selectMineFieldsFlaggedBombs = (state: RootState) => state.mineFields.flaggedBombs;

export default mineFieldsSlice.reducer;