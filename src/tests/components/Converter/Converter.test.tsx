import Converter from '@components/Converter';
import i18n from '@shared/i18n';
import { fireEvent, render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';

import cardNumbers from '../../mock/cardNumbers.json';


describe('Converter Component', () => {
  it('should render the Converter component', () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Converter />
      </I18nextProvider>
    );

    // Check if the component is rendered
    expect(container).toBeInTheDocument();
  });

  it('should convert data from text to hex correctly', () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Converter />
      </I18nextProvider>
    );
    const input = container.querySelector('.converter-input__input');
    const hexOutput = container.querySelector('.converter-output__hex-value');
    const convertButton = container.querySelector('.field__button--convert');
    if (
      input &&
      input instanceof HTMLInputElement &&
      hexOutput &&
      hexOutput instanceof HTMLDivElement &&
      convertButton &&
      convertButton instanceof HTMLButtonElement
    ) {
      cardNumbers.forEach(({ text, hex }) => {
        fireEvent.change(input, { target: { value: text } });
        fireEvent.click(convertButton);

        expect(hexOutput.textContent).toBe(hex);
      });
    }
  });

  it('The left part of text data should be less than 255', () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Converter />
      </I18nextProvider>
    );
    const input = container.querySelector('.converter-input__input');
    if (input && input instanceof HTMLInputElement) {
      fireEvent.change(input, { target: { value: '256,65537' } });
      const [left, right] = input.value.split(',').map((v) => Number(v));

      expect(left).toBeLessThanOrEqual(255);
      expect(right).toBeLessThanOrEqual(65535);
    }
  });
});
