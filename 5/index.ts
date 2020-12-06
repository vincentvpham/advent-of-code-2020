import { seats } from './input';

const makeTracker = (num: number): number[] => {
  const res = [];
  for (let i = 0; i < num; i++) {
    res.push(i);
  }
  return res;
};

const getSeatId = (seat: string): number => {
  let rows = makeTracker(128);

  const rowDirections = seat.slice(0, 7);

  for (let i = 0; i < rowDirections.length; i++) {
    const current = rowDirections[i];
    if (current === 'F') {
      // take first half
      rows = rows.slice(0, rows.length / 2);
    } else {
      // take last half
      // assume there are only 2 options
      rows = rows.slice(rows.length / 2);
    }
  }

  const row = rows[0];

  let cols = makeTracker(8);

  const colDirections = seat.slice(7);

  for (let i = 0; i < colDirections.length; i++) {
    const current = colDirections[i];
    if (current === 'L') {
      // take first half
      cols = cols.slice(0, cols.length / 2);
    } else {
      // take last half
      // assume there are only 2 options
      cols = cols.slice(cols.length / 2);
    }
  }

  const col = cols[0];

  return row * 8 + col;
};

const getMaxSeatId = (seats: string[]) => {
  const seatIds = seats.map(getSeatId);
  return Math.max(...seatIds);
};

// solution to part 1
console.log(getMaxSeatId(seats));

const getMySeatId = () => {
  const seatIds = seats.map(getSeatId).sort();
  for (let i = 0; i < seatIds.length - 1; i++) {
    const current = seatIds[i];
    const next = seatIds[i + 1];

    if (next - current > 1) {
      return next - 1;
    }
  }
};

// solution to part 2
console.log(getMySeatId());
