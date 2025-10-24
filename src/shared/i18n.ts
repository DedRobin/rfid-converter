import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      Convert: 'Convert',
      languageToggler: {
        en: 'EN',
        ru: 'RU',
      },
      input: {
        errors: {
          failToReadFromClipboard: 'Failed to read clipboard contents',
        },
      },
      output: {
        initMsg:
          'Enter the card\'s code and click the "Convert" button. HEX,DEX,and TEXT format codes are displayed here.',
        afterConvertMsg: 'Hover over the code to copy it.',
        isCopied: 'Copied!',
        errors: {
          failToCopy: 'Failed to copy text',
        },
      },
    },
  },
  ru: {
    translation: {
      Convert: 'Конвертировать',
      languageToggler: {
        en: 'Англ.',
        ru: 'Рус.',
      },
      input: {
        errors: {
          failToReadFromClipboard:
            'Не удалось прочитать содержимое буфера обмена',
        },
      },
      output: {
        initMsg:
          'Введите код карты и нажмите кнопку "Конвертировать". Здесь отоброзятся коды формата HEX, DEX, TEXT',
        afterConvertMsg: 'Наведите курсор на код, чтобы скопировать его.',
        isCopied: 'Скопировано!',
        errors: {
          failToCopy: 'Не удалось скопировать текст',
        },
      },
    },
  },
};

void i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
