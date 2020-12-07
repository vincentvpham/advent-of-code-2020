import fs from 'fs';
import { once } from 'events';
import readline from 'readline';

// dull silver bags contain 2 striped magenta bags, 2 dark coral bags, 1 bright orange bag, 4 plaid blue bags.
const parseBagRule = (rule: string): { [bagType: string]: string[] } => {
  let [bagTypeString, containsBagTypesString] = rule.split(' contain ');
  bagTypeString = bagTypeString.replace(/\s?([0-9]|(bags?\.?))\s?/g, '');
  containsBagTypesString = containsBagTypesString.replace(
    /\s?([0-9]|(bags?\.?))\s?/g,
    '',
  );
  return {
    [bagTypeString]: containsBagTypesString.split(','),
  };
};

const parseBagRules = async (): Promise<{ [bagType: string]: string[] }> => {
  let rules = {};

  const lineReader = readline.createInterface({
    input: fs.createReadStream(__dirname + '/input.txt'),
  });

  lineReader.on('line', (line: string) => {
    rules = {
      ...rules,
      ...parseBagRule(line),
    };
  });

  await once(lineReader, 'close');

  return rules;
};

const countNumCanContain = async (
  rules: { [bagType: string]: string[] },
  targetBagType: string,
  tracker: { [bagType: string]: boolean },
): Promise<number> => {
  let count = 0;
  const containingBags: { [bagType: string]: boolean } = {};

  const bagTypes = Object.keys(rules);
  bagTypes.forEach((type) => {
    if (rules[type].includes(targetBagType)) {
      count++;
      containingBags[type] = true;
      tracker[type] = true;
    }
  });

  const containingBagTypes = Object.keys(containingBags);
  for (let i = 0; i < containingBagTypes.length; i++) {
    const c = await countNumCanContain(rules, containingBagTypes[i], tracker);
    count += c;
  }

  return count;
};

const part1 = async (): Promise<number> => {
  const tracker: { [bagType: string]: boolean } = {};
  const rules = await parseBagRules();
  await countNumCanContain(rules, 'shiny gold', tracker);
  console.log(Object.keys(tracker).length);
  return Object.keys(tracker).length;
};

// so ugly but it works :)
part1();
