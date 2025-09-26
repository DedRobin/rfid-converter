import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TextValue from '@components/Converter/Output/values/TextValue';
import { CardFormatContext } from '@components/Converter/Output/context';
import mockContextValue from './mockData';

describe('TextValue Component', () => {
  it('should render the TextValue component', () => {
    const { getByText } = render(
      <CardFormatContext.Provider value={mockContextValue}>
        <TextValue />
      </CardFormatContext.Provider>
    );

    expect(getByText(mockContextValue.values.text)).toBeInTheDocument();
  });
  it('"handleCopy" in  the TextValue component should be called', () => {
    const mockHandleCopy = vi.fn();

    const { getByText } = render(
      <CardFormatContext.Provider
        value={{ ...mockContextValue, handleCopy: mockHandleCopy }}
      >
        <TextValue />
      </CardFormatContext.Provider>
    );

    const value = getByText(mockContextValue.values.text);
    fireEvent.click(value);

    expect(mockHandleCopy).toHaveBeenCalled();
  });
});
