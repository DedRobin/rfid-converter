const defaultFields = {
  text: '',
  dex: '',
  hex: '',
};

const REGEX_TEMPLATES = {
  TEXT: /^[0-2][0-5][0-5],[0-6][0-5][0-5][0-3][0-5]$/,
  DEX: /^00[0-1][0-6][0-7]{3}[0-2][0-1][0-5]$/,
  HEX: /^[0-9A-F]{6}$/,
};

export { defaultFields, REGEX_TEMPLATES };
