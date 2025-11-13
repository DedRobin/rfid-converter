import CopyAfterConvert from '@components/Main/Converter/Settings/properties/CopyAfterConvert';
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

  it('should select HEX option', () => {
    const { getByTestId, getByRole } = renderWithProviders(
      <CopyAfterConvert />
    );
    const copyAfterConvert = getByTestId('copy-after-convert-test-id');

    expect(copyAfterConvert).toBeInTheDocument();

    const hexButton = getByRole('radio', { name: 'HEX' });
    expect(hexButton).toBeInTheDocument();

    fireEvent.click(hexButton);

    expect(store.getState().settings.copyAfterConvert).toEqual('hex');
  });

  it('should select DEX option', () => {
    const { getByTestId, getByRole } = renderWithProviders(
      <CopyAfterConvert />
    );
    const copyAfterConvert = getByTestId('copy-after-convert-test-id');

    expect(copyAfterConvert).toBeInTheDocument();

    const hexButton = getByRole('radio', { name: 'DEX' });
    expect(hexButton).toBeInTheDocument();

    fireEvent.click(hexButton);

    expect(store.getState().settings.copyAfterConvert).toEqual('dex');
  });

  it('should select TEXT option', () => {
    const { getByTestId, getByRole } = renderWithProviders(
      <CopyAfterConvert />
    );
    const copyAfterConvert = getByTestId('copy-after-convert-test-id');

    expect(copyAfterConvert).toBeInTheDocument();

    const hexButton = getByRole('radio', { name: 'TEXT' });
    expect(hexButton).toBeInTheDocument();

    fireEvent.click(hexButton);

    expect(store.getState().settings.copyAfterConvert).toEqual('text');
  });
});
