import './style.css';
import CardFormatContext from '@contexts/CardFormat';
import { useContext } from 'react';


const TextValue = () => {
  const {
    className,
    handleCopy,
    values: { text },
  } = useContext(CardFormatContext);

  return (
    handleCopy &&
    text && (
      <div className={`${className}__text`}>
        <div className={`${className}__text-label`}>Text</div>
        <div
          className={`${className}__text-value`}
          onClick={(e) => handleCopy(e, text)}
        >
          {text}
        </div>
      </div>
    )
  );
};

export default TextValue;
