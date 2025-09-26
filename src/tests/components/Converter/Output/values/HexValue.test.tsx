import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CardFormatContext } from '@components/Converter/Output/context';
import mockContextValue from './mockData';
import HexValue from '@components/Converter/Output/values/HexValue';

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
