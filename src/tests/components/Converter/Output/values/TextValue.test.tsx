import TextValue from '@components/Converter/Output/values/TextValue';
import { fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWith } from './customRender';
import mockContextValue from './mockData';

describe('TextValue Component', () => {
  it('should render the TextValue component', () => {
    const { getByText } = renderWith(<TextValue />, mockContextValue);

    expect(getByText(mockContextValue.values.text!)).toBeInTheDocument();
  });
  it('"handleCopy" in  the TextValue component should be called', () => {
    const { getByText } = renderWith(<TextValue />, mockContextValue);

    const value = getByText(mockContextValue.values.text!);
    fireEvent.click(value);

    expect(mockContextValue.handleCopy).toHaveBeenCalled();
  });
});
