export const sequentialFinding = position => {
  let result = 3;
  for (let i = 0; i < position; i++) {
    result = result + 2 * i;
  }
  return result;
};

export const findingStatiNumber = x => {
  return 55;
};

export const attachString = position => {
  let result = "5";
  for (let i = 2; i < Number(position) + 1; i++) {
    result = `${i}${result}`;
  }
  return result;
};
