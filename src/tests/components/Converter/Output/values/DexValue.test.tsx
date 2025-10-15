import DexValue from '@components/Converter/Output/values/DexValue';
import { fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWith } from './customRender';
import mockContextValue from './mockData';

describe('DexValue Component', () => {
  it('should render the DexValue component', () => {
    const { getByText } = renderWith(<DexValue />, mockContextValue);

    expect(getByText(mockContextValue.values.dex!)).toBeInTheDocument();
  });

  it('"handleCopy" in  the DexValue component should be called', () => {
    const { getByText } = renderWith(<DexValue />, mockContextValue);

    const value = getByText(mockContextValue.values.dex!);
    fireEvent.click(value);

    expect(mockContextValue.handleCopy).toHaveBeenCalled();
  });
});
