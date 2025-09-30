import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';

import Output from '../../../../components/Converter/Output';

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
        initMasg: 'Test message 1',
        afterConvertMsg: 'Test message 2',
      },
    },
  },
  ru: {
    translation: {
      output: {
        initMasg: 'Тестовое сообщение 1',
        afterConvertMsg: 'Тестовое сообщение 2',
      },
    },
  },
};

describe('Output Component', () => {
  beforeAll(() => {
    i18n.use(initReactI18next).init({
      resources,
      lng: 'en',
      interpolation: {
        escapeValue: false,
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

  it('should display the initial message', () => {
    const { getByText, container } = render(
      <I18nextProvider i18n={i18n}>
        <Output text="" dex="" hex="" />
      </I18nextProvider>
    );

    const initialMessage = getByText(resources.en.translation.output.initMasg);

    expect(initialMessage).toBeInTheDocument();

    const languageToggler = container.querySelector('.language-toggler');
    if (languageToggler) {
      fireEvent.change(languageToggler, { target: { value: 'ru' } });

      const initialMessageRu = getByText(
        resources.ru.translation.output.initMasg
      );
      expect(initialMessageRu).toBeInTheDocument();
    }
  });

  it('should display the message after converting', () => {
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
});
