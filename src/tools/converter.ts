const isPositionalNumeralSystem = (value: unknown) =>
  value === 'text' || value === 'dex' || value === 'hex';

export { isPositionalNumeralSystem };
