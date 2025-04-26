import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Converter from '../../../components/Converter/index';

describe('Converter Component', () => {
  it('should render the Converter component', () => {
    const { container } = render(<Converter />);

    // Check if the component is rendered
    expect(container).toBeInTheDocument();
  });
});
