import { METHOD_PREFIX } from '@types';

export const capitalize = (string: string): string => {
  return string[0].toLocaleUpperCase() + string.slice(1);
};

export const createDOMListenerMethodName = (string: string): string => {
  return METHOD_PREFIX + capitalize(string);
};

export const splitAndToInt = (string: string, separator: string): number[] => {
  return string.split(separator).map((str) => +str);
};
