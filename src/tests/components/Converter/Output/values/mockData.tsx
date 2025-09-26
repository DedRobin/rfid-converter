import { vi } from 'vitest';

export default {
  className: 'test',
  handleCopy: vi.fn(),
  values: {
    text: 'test-text',
    dex: 'test-dex',
    hex: 'test-hex',
  },
};
