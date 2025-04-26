import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SelectType from '../../../../components/Converter/Input/SelectType';

// Assuming SelectType is a default export from SelectType.tsx

describe('SelectType Component', () => {
  it('should render the SelectType component', () => {
    const { container } = render(<SelectType />);

    // Check if the component is rendered
    expect(container).toBeInTheDocument();
  });
});
