import Output from '@components/Converter/Output';
import { fireEvent, render, waitFor } from '@testing-library/react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { beforeAll, describe, expect, it, vi } from 'vitest';

// Mock data for the Output component
const mockData = {
  text: '123,45678',
  dex: '1234567890',
  hex: '1A2B3C',
};

const resources = {
  en: {
    translation: {
      output: {
        initMsg: 'Test message 1',
        afterConvertMsg: 'Test message 2',
        isCopied: 'Copied!',
      },
    },
  },
  ru: {
    translation: {
      output: {
        initMsg: 'Тестовое сообщение 1',
        afterConvertMsg: 'Тестовое сообщение 2',
        isCopied: 'Скопировано!',
      },
    },
  },
};

const mockWriteText = vi.fn();

describe('Output Component', () => {
  beforeAll(async () => {
    await i18n.use(initReactI18next).init({
      resources,
      lng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });

    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText,
      },
    });
  });

  it('should render the Output component with mock data', () => {
    const { container, getByText } = render(<Output {...mockData} />);

    // Check if the component is rendered
    expect(container).toBeInTheDocument();

    // Check if the mock data is displayed
    expect(getByText(mockData.text)).toBeInTheDocument();
    expect(getByText(mockData.dex)).toBeInTheDocument();
    expect(getByText(mockData.hex)).toBeInTheDocument();
  });

  it('should call handleCopy when clicking on the hex copy button', () => {
    const { getByText } = render(<Output {...mockData} />);
    const textValue = getByText(mockData.text);
    const dexValue = getByText(mockData.dex);
    const hexValue = getByText(mockData.hex);

    expect(textValue).toBeInTheDocument();
    expect(dexValue).toBeInTheDocument();
    expect(hexValue).toBeInTheDocument();

    fireEvent.click(textValue);
    expect(mockWriteText).toHaveBeenCalledWith(mockData.text);

    fireEvent.click(dexValue);
    expect(mockWriteText).toHaveBeenCalledWith(mockData.dex);

    fireEvent.click(hexValue);
    expect(mockWriteText).toHaveBeenCalledWith(mockData.hex);
  });

  it('should display the initial message', () => {
    const { getByText, container } = render(
      <I18nextProvider i18n={i18n}>
        <Output dex="" hex="" text="" />
      </I18nextProvider>
    );

    const initialMessage = getByText(resources.en.translation.output.initMsg);

    expect(initialMessage).toBeInTheDocument();

    const languageToggler = container.querySelector('.language-toggler');
    if (languageToggler) {
      fireEvent.change(languageToggler, { target: { value: 'ru' } });

      const initialMessageRu = getByText(
        resources.ru.translation.output.initMsg
      );
      expect(initialMessageRu).toBeInTheDocument();
    }
  });

  it('should appear the message after converting', () => {
    const { getByText, container } = render(
      <I18nextProvider i18n={i18n}>
        <Output {...mockData} />
      </I18nextProvider>
    );

    const afterConvertingMsg = getByText(
      resources.en.translation.output.afterConvertMsg
    );

    expect(afterConvertingMsg).toBeInTheDocument();

    const languageToggler = container.querySelector('.language-toggler');
    if (languageToggler) {
      fireEvent.change(languageToggler, { target: { value: 'ru' } });

      const afterConvertingMsgRu = getByText(
        resources.ru.translation.output.afterConvertMsg
      );
      expect(afterConvertingMsgRu).toBeInTheDocument();
    }
  });

  it('should appear the "Copied!" message by clicking on the output code', async () => {
    const { getByText, container } = render(
      <I18nextProvider i18n={i18n}>
        <Output {...mockData} />
      </I18nextProvider>
    );

    const textCode = getByText(mockData.text);
    expect(textCode).toBeInTheDocument();

    fireEvent.click(textCode);

    await waitFor(() => {
      const msg = getByText(resources.en.translation.output.isCopied);
      expect(msg).toBeInTheDocument();
    });

    const languageToggler = container.querySelector('.language-toggler');
    if (languageToggler) {
      fireEvent.change(languageToggler, { target: { value: 'ru' } });

      const afterConvertingMsgRu = getByText(
        resources.ru.translation.output.isCopied
      );
      expect(afterConvertingMsgRu).toBeInTheDocument();
    }
  });
});
