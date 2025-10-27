import i18n from '@shared/i18n';
import store from '@store/index';
import { fireEvent, render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';

import LanguageToggler from '../../components/LanguageToggler/index';

describe('LanguageToggler Component', () => {
  it('should render the LanguageToggler component', () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <LanguageToggler />
        </I18nextProvider>
      </Provider>
    );

    const selectElement = screen.getByTestId('custom-select');
    expect(selectElement).toBeInTheDocument();
  });

  it('should have language-toggler class and value set to en', () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <LanguageToggler />
        </I18nextProvider>
      </Provider>
    );

    const selectElement = screen.getByTestId('custom-select');
    expect(selectElement).toHaveTextContent('EN');
  });

  it('should change language to ru when selected', () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <LanguageToggler />
        </I18nextProvider>
      </Provider>
    );

    const selectElement = screen.getByTestId('custom-select');
    expect(selectElement).toBeInTheDocument();
    const selectedOption = screen.getByTestId('selected-option');

    fireEvent.click(selectElement);

    const [enOption, ruOption] = screen.getAllByTestId('custom-select-option');

    expect(ruOption).toBeInTheDocument();
    expect(enOption).toBeInTheDocument();

    expect(ruOption).toHaveTextContent('RU');
    fireEvent.click(ruOption);
    expect(selectedOption).toHaveTextContent('RU');

    expect(enOption).toHaveTextContent('EN');

    fireEvent.click(enOption);
    expect(selectedOption).toHaveTextContent('EN');

    // expect(selectElement).toHaveValue('ru');
    // fireEvent.change(selectElement, { target: { value: 'ru' } });
    // expect(selectElement).toHaveValue('ru');

    // fireEvent.change(selectElement, { target: { value: 'en' } });
    // expect(selectElement).toHaveValue('en');
  });
});
