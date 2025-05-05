import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import SelectType from '../../../../components/Converter/Input/SelectType';


const mockProps = {
  className: 'select',
  onSelectTypeChange: vi.fn(),
};

describe('SelectType Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the SelectType component', () => {
    const { container } = render(<SelectType {...mockProps} />);

    expect(container).toBeInTheDocument();
  });

  it('should call onSelectTypeChange when the component is interacted with', () => {
    const { getByRole } = render(<SelectType {...mockProps} />);

    const selectElement = getByRole('combobox') as HTMLSelectElement;
    fireEvent.change(selectElement, { target: { value: 'dex' } });

    expect(mockProps.onSelectTypeChange).toHaveBeenCalled();
  });

  it('should render the SelectType component with the correct options', () => {
    const { getByRole } = render(<SelectType {...mockProps} />);

    const selectElement = getByRole('combobox') as HTMLSelectElement;
    expect(selectElement.options).toHaveLength(3);
  });  
});
