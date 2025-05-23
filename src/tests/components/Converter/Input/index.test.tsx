import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ConverterInput from '../../../../components/Converter/Input';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../../i18n';

const mockProps = {
  labelName: 'test-label',
  convertTo: vi.fn(),
  saveAsCsv: vi.fn(),
};

describe('ConverterInput Component', () => {
  it('should render the ConverterInput component', () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <ConverterInput {...mockProps} />
      </I18nextProvider>
    );

    expect(container).toBeInTheDocument();
  });

  it('should call saveAsCsv when save button is clicked', () => {
    const { getByText } = render(
      <I18nextProvider i18n={i18n}>
        <ConverterInput {...mockProps} />
      </I18nextProvider>
    );

    const saveButton = getByText('💾');
    expect(saveButton).toBeInTheDocument();

    fireEvent.click(saveButton);
    expect(mockProps.saveAsCsv).toHaveBeenCalledTimes(1);
  });
});
