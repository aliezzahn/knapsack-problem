// 1 - Microwave - weight: 8, value: 50
// 2 - Drone - weight: 2, value: 150
// 3 - Monitor - weight: 6, value: 210
// 4 - Kettle - weight: 1, value: 30
// Total capacity of container can hold 10kgs

import chalk from "chalk";
import { createEmptyMatrix, createRangeArray } from "./utils";

const log = console.log;

function getMaxValueInContainer(
  itemsNumber,
  maxCapacity,
  weights,
  values,
  data
) {
  for (let itemNumber = 0; itemNumber <= ITEMS_NUMBER; itemNumber++) {
    for (let capacity = 0; capacity <= MAX_CAPACITY; capacity++) {
      if (itemNumber === 0 || capacity === 0) {
        data[itemNumber][capacity] = 0;
      } else if (WEIGHTS[itemNumber] <= capacity) {
        data[itemNumber][capacity] = Math.max(
          VALUES[itemNumber] +
            data[itemNumber - 1][capacity - WEIGHTS[itemNumber]],
          data[itemNumber - 1][capacity]
        );
      } else {
        data[itemNumber][capacity] = data[itemNumber - 1][capacity];
      }
    }
  }
  return data[itemsNumber][maxCapacity];
}

function outputItemInclusionStatus(
  itemsNumber,
  maxCapacity,
  weights,
  values,
  data,
  itemsName
) {
  let i = itemsNumber;
  let j = maxCapacity;
  while (i > 0 && j > 0) {
    if (data[i][j] === data[i - 1][j]) {
      log(
        chalk.white.bgRed.bold(
          `EXCLUDED: Item Name: ${itemsName[i]}, Item Weight: ${weights[i]}, Item Value: ${values[i]}`
        )
      );
    } else {
      log(
        chalk.white.bgGreen.bold(
          `INCLUDED: Item Name: ${itemsName[i]}, Item Weight: ${weights[i]}, Item Value: ${values[i]}`
        )
      );
      j = j - weights[i];
    }
    i--;
  }
}

const ITEMS_NAME = ["", "Microwave", "Drone", "Monitor", "Kettle"];
const WEIGHTS = [0, 8, 2, 6, 1];
const VALUES = [0, 50, 150, 210, 30];
const ITEMS_NUMBER = 4;
const MAX_CAPACITY = 10;
let DATA = createEmptyMatrix(ITEMS_NUMBER + 1, MAX_CAPACITY + 1, 0);

// console.log(ITEMS_NAME);

const result = getMaxValueInContainer(
  ITEMS_NUMBER,
  MAX_CAPACITY,
  WEIGHTS,
  VALUES,
  DATA
);

outputItemInclusionStatus(
  ITEMS_NUMBER,
  MAX_CAPACITY,
  WEIGHTS,
  VALUES,
  DATA,
  ITEMS_NAME
);

// console.log(`Max value of items included in container: ${result}`);
