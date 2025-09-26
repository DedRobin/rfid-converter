import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Output from '../../../../components/Converter/Output';

// Mock data for the Output component
const mockData = {
  text: '123,45678',
  dex: '1234567890',
  hex: '1A2B3C',
};

describe('Output Component', () => {
  it('should render the Output component with mock data', () => {
    const { container, getByText } = render(<Output {...mockData} />);

    // Check if the component is rendered
    expect(container).toBeInTheDocument();

    // Check if the mock data is displayed
    expect(getByText(mockData.text)).toBeInTheDocument();
    expect(getByText(mockData.dex)).toBeInTheDocument();
    expect(getByText(mockData.hex)).toBeInTheDocument();
  });

  it('should call handleCopy when clicking on the hex copy button', async () => {
    const { getByText } = render(<Output {...mockData} />);
    const textValue = getByText(mockData.text);
    const dexValue = getByText(mockData.dex);
    const hexValue = getByText(mockData.hex);

    expect(textValue).toBeInTheDocument();
    expect(dexValue).toBeInTheDocument();
    expect(hexValue).toBeInTheDocument();

    fireEvent.click(textValue);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockData.text);

    fireEvent.click(dexValue);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockData.dex);

    fireEvent.click(hexValue);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockData.hex);
  });
});
