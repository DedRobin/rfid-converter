import CopyAfterConvert from '@components/Main/Converter/Settings/properties/CopyAfterConvert';
import { resources } from '@shared/i18n';
import store from '@store/index';
import { fireEvent } from '@testing-library/dom';
import { renderWithProviders } from '@tests/utils';
import { describe, expect, it } from 'vitest';

describe('CopyAfterConvert.test Component', () => {
  it('should be rendered', () => {
    const { getByTestId } = renderWithProviders(<CopyAfterConvert />);
    const copyAfterConvert = getByTestId('copy-after-convert-test-id');

    expect(copyAfterConvert).toBeInTheDocument();
  });
  it('checkbox is ')

  it('should select HEX option', () => {
    const { getByTestId, getByRole } = renderWithProviders(
      <CopyAfterConvert />
    );

    const checkbox = getByRole('checkbox', {
      name: resources.en.translation.settings.copyAfterConvert,
    });
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);

    const copyAfterConvert = getByTestId(
      'copy-after-convert-radio-buttons-test-id'
    );
    expect(copyAfterConvert).toBeInTheDocument();

    const hexButton = getByRole('radio', { name: 'HEX' });
    expect(hexButton).toBeInTheDocument();

    fireEvent.click(hexButton);

    expect(store.getState().settings.copyAfterConvert).toEqual('hex');
  });

  it('should select DEX option', () => {
    const { getByRole } = renderWithProviders(<CopyAfterConvert />);

    const hexButton = getByRole('radio', { name: 'DEX' });
    expect(hexButton).toBeInTheDocument();

    fireEvent.click(hexButton);

    expect(store.getState().settings.copyAfterConvert).toEqual('dex');
  });

  it('should select TEXT option', () => {
    const { getByRole } = renderWithProviders(<CopyAfterConvert />);

    const hexButton = getByRole('radio', { name: 'TEXT' });
    expect(hexButton).toBeInTheDocument();
    fireEvent.click(hexButton);
    expect(store.getState().settings.copyAfterConvert).toEqual('text');
  });
});
