import { render, fireEvent, waitFor } from '@testing-library/react';
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
    const { getByTestId } = render(<Output {...mockData} />);
    const hexCopyButton = getByTestId('hex-copy-button');

    expect(hexCopyButton).toBeInTheDocument();
    expect(hexCopyButton).toHaveTextContent('📋');

    // Simulate click event
    fireEvent.click(hexCopyButton);

    // Wait for the state change
    await waitFor(() => {
      expect(hexCopyButton).toHaveTextContent('✅');
    });

    // Verify that the clipboard writeText method was called
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockData.hex);
  });
});
