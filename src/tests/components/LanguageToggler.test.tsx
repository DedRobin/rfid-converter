import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import LanguageToggler from '../../components/LanguageToggler/index';
import store from '@store/index';

describe('LanguageToggler Component', () => {
  it('should render the LanguageToggler component', () => {
    render(
      <Provider store={store}>
        <LanguageToggler />
      </Provider>
    );

    // Check if the select element is rendered
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });

  it('should have language-toggler class and value set to en', () => {
    render(
      <Provider store={store}>
        <LanguageToggler />
      </Provider>
    );

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveClass('language-toggler');
    expect(selectElement).toHaveValue('en');
  });

  it('should change language to ru when selected', () => {
    render(
      <Provider store={store}>
        <LanguageToggler />
      </Provider>
    );

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'ru' } });
    expect(selectElement).toHaveValue('ru');
  });
});
