import { useTranslation } from 'react-i18next';
import './style.css';

export default function LanguageToggler() {
  const { i18n } = useTranslation();

  return (
    <select
      className="language-toggler"
      onChange={(event) => i18n.changeLanguage(event.target.value)}
    >
      <option value="en">EN</option>
      <option value="ru">RU</option>
    </select>
  );
}
