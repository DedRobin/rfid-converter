import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import CardFormatContext from '@contexts/CardFormat';
import TextValue from '@components/Converter/Output/values/TextValue';
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
