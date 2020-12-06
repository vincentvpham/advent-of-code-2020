import fs from 'fs';
import { once } from 'events';
import readline from 'readline';

const countCustomsData = async (): Promise<number> => {
  let count = 0;

  const lineReader = readline.createInterface({
    input: fs.createReadStream(__dirname + '/input.txt'),
  });

  let groupTracker: { [answer: string]: boolean } = {};

  lineReader.on('line', (line: string) => {
    if (line === '') {
      count += Object.keys(groupTracker).length;
      groupTracker = {};
      return;
    }

    const answers = line.split('');
    answers.forEach((a) => {
      groupTracker[a] = true;
    });
  });

  await once(lineReader, 'close');

  console.log(count);

  return count;
};

countCustomsData();

const countCustomsDataConsensus = async (): Promise<number> => {
  let count = 0;

  const lineReader = readline.createInterface({
    input: fs.createReadStream(__dirname + '/input.txt'),
  });

  let groupTracker: { [answer: string]: number } = {};
  let groupCount = 0;

  lineReader.on('line', (line: string) => {
    if (line === '') {
      const answers = Object.keys(groupTracker);
      answers.forEach((a) => {
        if (groupTracker[a] === groupCount) {
          count++;
        }
      });
      groupTracker = {};
      groupCount = 0;
      return;
    }

    groupCount++;

    const answers = line.split('');
    answers.forEach((a) => {
      groupTracker[a] ? (groupTracker[a] += 1) : (groupTracker[a] = 1);
    });
  });

  await once(lineReader, 'close');

  console.log(count);

  return count;
};

countCustomsDataConsensus();
