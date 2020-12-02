import { expenseReport } from './input';

export const twoSum = (
  nums: number[],
  target: number,
): [number, number] | undefined => {
  const targets: { [target: number]: number } = {};

  // assume all numbers are less than target
  nums.forEach((num) => {
    const t = target - num;
    targets[t] = num;
  });

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    if (targets[current]) {
      return [current, targets[current]];
    }
  }
};

const twoNums = twoSum(expenseReport, 2020);

// solution to part 1
if (twoNums) {
  console.log(twoNums[0] * twoNums[1]);
}

export const threeSum = (
  nums: number[],
  target: number,
): [number, number, number] | undefined => {
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const t = target - current;
    const two = twoSum(nums, t);
    if (two) {
      return [current, ...two];
    }
  }
};

const threeNums = threeSum(expenseReport, 2020);

// solution to part 2
if (threeNums) {
  console.log(threeNums[0] * threeNums[1] * threeNums[2]);
}
