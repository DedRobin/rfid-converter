import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import CardFormatContext from '@contexts/CardFormat';
import HexValue from '@components/Converter/Output/values/HexValue';
import mockContextValue from './mockData';

describe('HexValue Component', () => {
  it('should render the HexValue component', () => {
    const { getByText } = render(
      <CardFormatContext.Provider value={mockContextValue}>
        <HexValue />
      </CardFormatContext.Provider>
    );

    expect(getByText(mockContextValue.values.hex)).toBeInTheDocument();
  });
  it('"handleCopy" in  the HexValue component should be called', () => {
    const mockHandleCopy = vi.fn();

    const { getByText } = render(
      <CardFormatContext.Provider
        value={{ ...mockContextValue, handleCopy: mockHandleCopy }}
      >
        <HexValue />
      </CardFormatContext.Provider>
    );

    const value = getByText(mockContextValue.values.hex);
    fireEvent.click(value);

    expect(mockHandleCopy).toHaveBeenCalled();
  });
});
