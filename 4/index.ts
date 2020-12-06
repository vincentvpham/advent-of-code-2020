import fs from 'fs';
import { once } from 'events';
import readline from 'readline';

const isValidNorthPoleCredentials = (fields: {
  [field: string]: string;
}): boolean => {
  if (fields.byr === undefined) {
    return false;
  }
  if (fields.iyr === undefined) {
    return false;
  }
  if (fields.eyr === undefined) {
    return false;
  }
  if (fields.hgt === undefined) {
    return false;
  }
  if (fields.hcl === undefined) {
    return false;
  }
  if (fields.ecl === undefined) {
    return false;
  }
  if (fields.pid === undefined) {
    return false;
  }

  return true;
};

const processPassportData = async (): Promise<
  { [field: string]: string }[]
> => {
  const lineReader = readline.createInterface({
    input: fs.createReadStream(__dirname + '/input.txt'),
  });

  const passports: { [field: string]: string }[] = [];
  let current: { [field: string]: string } = {};

  lineReader.on('line', (line) => {
    if (line === '') {
      passports.push(current);
      // console.log(current);
      current = {};
      return;
    }

    const fields = line.split(' ');
    fields.forEach((f) => {
      const [key, value] = f.split(':');
      current[key] = value;
    });
  });

  await once(lineReader, 'close');

  return passports;
};

const countValidPassports = async (
  isValid: (passport: { [field: string]: string }) => boolean,
): Promise<number> => {
  let count = 0;
  const passports = await processPassportData();

  passports.forEach((p) => {
    if (isValid(p)) {
      count++;
    }
  });

  return count;
};

const part1 = async (): Promise<void> => {
  const count = await countValidPassports(isValidNorthPoleCredentials);
  console.log(count);
};

part1();

const isValidNorthPoleCredentialsWithValidation = (fields: {
  [field: string]: string;
}): boolean => {
  if (!isValidNorthPoleCredentials(fields)) {
    return false;
  }

  const birthYear = Number(fields.byr);
  if (birthYear < 1920) {
    return false;
  }
  if (birthYear > 2002) {
    return false;
  }

  const issueYear = Number(fields.iyr);
  if (issueYear < 2010) {
    return false;
  }
  if (issueYear > 2020) {
    return false;
  }

  const expirationYear = Number(fields.eyr);
  if (expirationYear < 2020) {
    return false;
  }
  if (expirationYear > 2030) {
    return false;
  }

  const heightUnit = fields.hgt.slice(-2);
  const heightValue = Number(fields.hgt.slice(0, -2));
  if (heightUnit === 'cm' || heightUnit === 'in') {
    if (heightUnit === 'cm') {
      if (heightValue < 150 || heightValue > 193) {
        return false;
      }
    }
    if (heightUnit === 'in') {
      if (heightValue < 59 || heightValue > 76) {
        return false;
      }
    }
  } else {
    return false;
  }

  if (fields.hcl[0] !== '#') {
    return false;
  }
  const hairColorValue = fields.hcl.slice(1);
  if (hairColorValue.length > 6) {
    return false;
  }
  if (!/([a-f]|[0-9]){6}/.test(hairColorValue)) {
    return false;
  }

  const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
  const eyeColor = fields.ecl;
  if (eyeColors.indexOf(eyeColor) === -1) {
    return false;
  }

  const passportId = fields.pid;
  if (passportId.length !== 9) {
    return false;
  }
  if (!/([0-9]){9}/.test(passportId)) {
    return false;
  }

  return true;
};

const part2 = async (): Promise<void> => {
  const count = await countValidPassports(
    isValidNorthPoleCredentialsWithValidation,
  );
  console.log(count);
};

part2();
