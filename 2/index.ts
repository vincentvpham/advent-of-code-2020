import { passwords } from './input';

interface Policy {
  min: number;
  max: number;
  letter: string;
}

const isValid = (password: string, policy: Policy): boolean => {
  let count = 0;

  for (let i = 0; i < password.length; i++) {
    if (password[i] === policy.letter) {
      count++;
    }
  }

  return count >= policy.min && count <= policy.max;
};

// sample input
// '8-9 n: nnnnnnnnn'
const parseInput = (input: string): [string, Policy] => {
  // ['8-9', 'n:', 'nnnnnnnnn']
  const [range, letterColon, password] = input.split(' ');
  const letter = letterColon[0];
  const [minString, maxString] = range.split('-');
  const min = Number(minString);
  const max = Number(maxString);

  return [password, { min, max, letter }];
};

const numValidPasswords = (
  passwords: string[],
  isValid: (password: string, policy: Policy) => boolean,
) => {
  let count = 0;
  passwords.forEach((p) => {
    const input = parseInput(p);
    if (isValid(...input)) {
      count++;
    }
  });

  return count;
};

const validPasswordCount = numValidPasswords(passwords, isValid);

// solution to part 1
console.log(validPasswordCount);

const realIsValid = (password: string, policy: Policy): boolean => {
  const first = password[policy.min - 1];
  const second = password[policy.max - 1];

  if (first === second) {
    return false;
  }

  if (first === policy.letter || second === policy.letter) {
    return true;
  }

  return false;
};

const realValidPasswordCount = numValidPasswords(passwords, realIsValid);

// solution to part 2
console.log(realValidPasswordCount);
