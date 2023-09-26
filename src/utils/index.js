export const createRangeArray = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );

export const createEmptyMatrix = (
  rowNumber = 1,
  columnNumber = 1,
  fillValue = 0
) => {
  return Array(rowNumber)
    .fill()
    .map(() => Array(columnNumber).fill(fillValue));
};
