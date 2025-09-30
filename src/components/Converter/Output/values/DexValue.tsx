import { useContext } from 'react';

import { CardFormatContext } from '../context';
import './style.css';

const DexValue = () => {
  const {
    className,
    handleCopy,
    values: { dex },
  } = useContext(CardFormatContext);

  return (
    handleCopy &&
    dex && (
      <div className={`${className}__dex`}>
        <div className={`${className}__dex-label`}>Deximal</div>
        <div
          className={`${className}__dex-value`}
          onClick={(e) => handleCopy(e, dex)}
        >
          {dex}
        </div>
      </div>
    )
  );
};

export default DexValue;
