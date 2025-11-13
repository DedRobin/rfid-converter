import CopyAfterConvert from '@components/Main/Converter/Settings/properties/CopyAfterConvert';
import { renderWithProviders } from '@tests/utils';
import { describe, expect, it } from 'vitest';

describe('CopyAfterConvert.test Component', () => {
  it('should be rendered', () => {
    const { getByTestId } = renderWithProviders(<CopyAfterConvert />);
    const copyAfterConvert = getByTestId('copy-after-convert-test-id');

    expect(copyAfterConvert).toBeInTheDocument();
  });
});
