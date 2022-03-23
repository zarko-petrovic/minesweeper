import { put, take, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import {
  setMineFieldsValues,
  setMineFieldsStatus
} from './mineFieldsSlice';
import { webSocket } from '../../app/webSocket';

const initWebSocketChannel = () => {
  return eventChannel(emit => {
    webSocket.onopen = _ => {
      webSocket.send('new 1');
    };

    webSocket.onmessage = (event) => {
      const data = event.data;

      return emit({ data });
    }

    // unsubscribe function
    return () => webSocket.close();
  });
}

export default function* mineFieldsSaga() {
  const webSocketChannel = yield call(initWebSocketChannel);

  while (true) {
    const event = yield take(webSocketChannel);
    const data = event && event.data ? event.data : '';

    if (data.startsWith('map:')) {
      const eventData = data.replace('map:', '').split('\n').filter((x: string) => x !== '');

      const values: string[][] = [];
      const flaggedBombs: boolean[][] = [];
      eventData.forEach((row: string) => {
        values.push(Array.from(row).map((x: string) => x === '□' ? '' : x));
        flaggedBombs.push(Array(row.length).fill(false));
      });

      yield put(setMineFieldsValues({ values, flaggedBombs }));
    } else if (data === 'open: You lose') {
      yield put(setMineFieldsStatus('lose'));
      yield webSocket.send('map');
    } else if (data.startsWith('open: You win')) {
      yield put(setMineFieldsStatus('win'));
      yield webSocket.send('map');
    } else if (data.startsWith('new:') || data.startsWith('open: OK')) {
      yield put(setMineFieldsStatus('idle'));
      yield webSocket.send('map');
    }
  }
}