import CardTypes from '@components/Main/Converter/Input/CardTypes';
import i18n from '@shared/i18n';
import { fireEvent, render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { afterEach, describe, expect, it, vi } from 'vitest';

const mockProps = {
  changeType: vi.fn(),
};

describe('CardTypes Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the component', () => {
    const { getByTestId } = render(
      <I18nextProvider i18n={i18n}>
        <CardTypes {...mockProps} />
      </I18nextProvider>
    );

    expect(getByTestId('card-types')).toBeInTheDocument();
  });

  it('should call "changeType" when the component is interacted with', () => {
    const { getByRole } = render(<CardTypes {...mockProps} />);

    const textOption = getByRole('radio', {
      name: 'Text',
    });
    expect(textOption).toBeInTheDocument();

    const dexOption = getByRole('radio', { name: 'Dex' });
    expect(dexOption).toBeInTheDocument();

    const hexOption = getByRole('radio', { name: 'Hex' });
    expect(hexOption).toBeInTheDocument();

    fireEvent.click(dexOption);
    expect(dexOption).toBeChecked();

    fireEvent.click(hexOption);
    expect(hexOption).toBeChecked();

    fireEvent.click(textOption);
    expect(textOption).toBeChecked();

    expect(mockProps.changeType).toHaveBeenCalledTimes(3);
  });
});
