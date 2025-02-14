const fromHexToDex = (value: string) => {
  return String(Number.parseInt(value, 16)).padStart(10, '0');
};

const fromHexToText = (hex: string) => {
  const before = String(Number.parseInt(hex.slice(0, 2), 16)).padStart(3, '0');
  const after = String(Number.parseInt(hex.slice(2), 16)).padStart(5, '0');
  const text = [before, after].join(',');

  return text;
};

const fromDexToHex = (value: string) => {
  const number = Number(value);
  if (Number.isNaN(number)) throw new Error('Got NaN');
  const hex = number.toString(16).padStart(6, '0').toUpperCase().slice(-6);
  return hex;
};

const fromDexToText = (value: string) => {
  const hex = fromDexToHex(value);
  const text = fromHexToText(hex);
  return text;
};

const fromTextToHex = (value: string) => {
  const [beforeText, afterText] = value.split(',');
  const beforeDex = Number(beforeText);
  const afterDex = Number(afterText);
  if (Number.isNaN(beforeDex) || Number.isNaN(afterDex))
    throw new Error('Got NaN');
  const beforeHex = beforeDex.toString(16);
  const afterHex = afterDex.toString(16);

  return [beforeHex, afterHex].join('').toUpperCase();
};

const fromTextToDex = (value: string) => {
  const hex = fromTextToHex(value);
  const dex = String(Number.parseInt(hex, 16)).padStart(10, '0');
  return dex;
};

const convert = {
  fromDexToText,
  fromDexToHex,
  fromHexToDex,
  fromHexToText,
  fromTextToDex,
  fromTextToHex,
} as const;

export { convert };
