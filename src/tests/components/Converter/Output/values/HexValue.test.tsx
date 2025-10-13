import { describe, expect, it } from 'vitest';
import HexValue from '@components/Converter/Output/values/HexValue';
import { fireEvent } from '@testing-library/react';
import mockContextValue from './mockData';
import { renderWith } from './customRender';

describe('HexValue Component', () => {
  it('should render the HexValue component', () => {
    const { getByText } = renderWith(<HexValue />, mockContextValue);

    expect(getByText(mockContextValue.values.hex!)).toBeInTheDocument();
  });
  it('"handleCopy" in  the HexValue component should be called', () => {
    const { getByText } = renderWith(<HexValue />, mockContextValue);

    const value = getByText(mockContextValue.values.hex!);
    fireEvent.click(value);

    expect(mockContextValue.handleCopy).toHaveBeenCalled();
  });
});
