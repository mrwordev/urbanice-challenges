import { AsyncStorage } from "react-native";

const HISTORY_KEY = "urbanice_history";
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

export const solveEquation = (question, value) => {
  switch (Number(question)) {
    case 1:
      return sequentialFinding(value);
    case 2:
      return findingStatiNumber();
    case 3:
      return attachString(value);
    default:
      return 0;
  }
};

export const storageUpdateHistory = async message => {
  try {
    const history = await storageGetHistory();
    history.push(message);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    return history;
  } catch (error) {
    console.warn(error);
    alert("Error saving the data.");
  }
};

export const storageGetHistory = async () => {
  try {
    const history = await AsyncStorage.getItem(HISTORY_KEY);
    if (history !== null) {
      return JSON.parse(history);
    }
    return [];
  } catch (error) {
    console.warn(error);
    alert("Error getting the data.");
    return [];
  }
};

export const storageRemoveHistory = async () => {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
    return true;
  } catch (error) {
    return false;
  }
};
