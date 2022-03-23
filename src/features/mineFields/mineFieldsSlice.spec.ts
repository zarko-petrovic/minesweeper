import mineFieldsReducer, {
  MineFieldsState,
  setMineFieldsLevel,
  setMineFieldsStatus,
  setMineFieldsValues
} from './mineFieldsSlice';

describe('mine fields reducer', () => {
  const initialState: MineFieldsState = {
    values: [],
    status: 'idle',
    level: 1,
    flaggedBombs: []
  };

  it('should handle initial state', () => {
    expect(mineFieldsReducer(undefined, { type: 'unknown' })).toEqual({
      values: [],
      status: 'idle',
      level: 1,
      flaggedBombs: []
    });
  });

  it('should handle set mine fields level', () => {
    const actual = mineFieldsReducer(initialState, setMineFieldsLevel(2));

    expect(actual.level).toEqual(2);
  });

  it('should handle set mine fields state', () => {
    const actual = mineFieldsReducer(initialState, setMineFieldsStatus('win'));

    expect(actual.status).toEqual('win');
  });

  it('should handle set mine fields values', () => {
    const actual = mineFieldsReducer(initialState, setMineFieldsValues({
      values: [['1', '3'], ['1', '2']],
      flaggedBombs: [[true, false], [true, true]]
    }));

    expect(actual.values.length).toEqual(2);
  });

  it('should handle set mine fields flagged bombs', () => {
    const actual = mineFieldsReducer(initialState, setMineFieldsValues({
      values: [['', ''], ['', '']],
      flaggedBombs: [[true, false], [true, true]]
    }));

    expect(actual.flaggedBombs.length).toEqual(2);
  });
});
