import { CardFormatContextProps } from '@contexts/interfaces';
import { vi } from 'vitest';

const mockValue: CardFormatContextProps = {
  handleCopy: vi.fn(),
  values: {
    text: 'test-text',
    dex: 'test-dex',
    hex: 'test-hex',
  },
  currentCopiedType: 'text',
};

export default mockValue;
