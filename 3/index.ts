import { map } from './input';

const TREE = '#';
// assume they are all the same size
const WIDTH = map[0].length;

const countTrees = (
  map: string[],
  rightSlope: number,
  downSlope: number,
): number => {
  let count = 0;
  let x = 0;

  for (let y = 0; y < map.length; y += downSlope) {
    const current = map[y][x % WIDTH];

    if (current === TREE) {
      count++;
    }

    x += rightSlope;
  }

  return count;
};

// solution to part 1
console.log(countTrees(map, 3, 1));

// solution to part 2
console.log(
  countTrees(map, 1, 1) *
    countTrees(map, 3, 1) *
    countTrees(map, 5, 1) *
    countTrees(map, 7, 1) *
    countTrees(map, 1, 2),
);
