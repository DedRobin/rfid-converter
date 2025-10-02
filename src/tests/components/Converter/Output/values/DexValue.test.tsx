import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import CardFormatContext from '@contexts/CardFormat';
import DexValue from '@components/Converter/Output/values/DexValue';
import mockContextValue from './mockData';

describe('DexValue Component', () => {
  it('should render the DexValue component', () => {
    const { getByText } = render(
      <CardFormatContext.Provider value={mockContextValue}>
        <DexValue />
      </CardFormatContext.Provider>
    );

    expect(getByText(mockContextValue.values.dex)).toBeInTheDocument();
  });

  it('"handleCopy" in  the DexValue component should be called', () => {
    const mockHandleCopy = vi.fn();

    const { getByText } = render(
      <CardFormatContext.Provider
        value={{ ...mockContextValue, handleCopy: mockHandleCopy }}
      >
        <DexValue />
      </CardFormatContext.Provider>
    );

    const value = getByText(mockContextValue.values.dex);
    fireEvent.click(value);

    expect(mockHandleCopy).toHaveBeenCalled();
  });
});
