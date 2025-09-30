import { useContext } from 'react';

import { CardFormatContext } from '../context';
import './style.css';

const HexValue = () => {
  const {
    className,
    handleCopy,
    values: { hex },
  } = useContext(CardFormatContext);

  return (
    handleCopy &&
    hex && (
      <div className={`${className}__hex`}>
        <div className={`${className}__hex-label`}>Heximal</div>
        <div
          className={`${className}__hex-value`}
          onClick={(e) => handleCopy(e, hex)}
        >
          {hex}
        </div>
      </div>
    )
  );
};

export default HexValue;
