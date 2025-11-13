import Settings from '@components/Main/Converter/Settings';
import i18n from '@shared/i18n';
import { fireEvent } from '@testing-library/dom';
import { renderWithProviders } from '@tests/utils';
import { describe, expect, it } from 'vitest';

describe('Settings Component', () => {
  it('should be rendered EN', async () => {
    const { getByTestId } = renderWithProviders(<Settings />);

    const settings = getByTestId('settings-test-id');
    expect(settings).toBeInTheDocument();
    expect(settings).toHaveTextContent('Settings');

    await i18n.changeLanguage('ru');
    expect(settings).toHaveTextContent('Settings');
  });

  it('should be rendered RU', async () => {
    await i18n.changeLanguage('ru');

    const { getByTestId } = renderWithProviders(<Settings />);

    const settings = getByTestId('settings-test-id');
    expect(settings).toBeInTheDocument();
    expect(settings).toHaveTextContent('Настройки');
  });

  it('should display collapsed menu by clicking on "Settings" Button', () => {
    const { getByTestId } = renderWithProviders(<Settings />);

    const collapsedButton = getByTestId('collapsed-button-test-id');
    expect(collapsedButton).toBeInTheDocument();

    fireEvent.click(collapsedButton);

    const collapsedMenu = getByTestId('collapsed-menu-test-id');
    expect(collapsedMenu).toBeInTheDocument();
  });
});
