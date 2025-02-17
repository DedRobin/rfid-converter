const isNumber = (char: string) => '0123456789'.includes(char);
const isAlpha = (char: string) =>
  'abcdefghijklmnopqrstuvwxyz'.includes(char.toLocaleLowerCase());

export { isNumber, isAlpha };
