import Prompt from '@components/Main/Converter/Input/Prompt';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const mockMsg = 'test-msg';

describe('Prompt Component', () => {
  it('should render the component', () => {
    const { getByText } = render(<Prompt msg={mockMsg} />);

    expect(getByText(mockMsg)).toBeInTheDocument();
  });
});
