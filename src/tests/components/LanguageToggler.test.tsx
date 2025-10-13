import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import LanguageToggler from '../../components/LanguageToggler/index';
import { Provider } from 'react-redux';
import i18n from '@shared/i18n';
import store from '@store/index';

describe('LanguageToggler Component', () => {
  it('should render the LanguageToggler component', () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <LanguageToggler />
        </I18nextProvider>
      </Provider>
    );

    // Check if the select element is rendered
    const selectElement = screen.getByRole('combobox');
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

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveClass('language-toggler');
    expect(selectElement).toHaveValue('en');
  });

  it('should change language to ru when selected', () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <LanguageToggler />
        </I18nextProvider>
      </Provider>
    );

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'ru' } });
    expect(selectElement).toHaveValue('ru');

    fireEvent.change(selectElement, { target: { value: 'en' } });
    expect(selectElement).toHaveValue('en');
  });
});
