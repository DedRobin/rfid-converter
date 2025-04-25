import React from 'react';
import './style.css';

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );
};

export default Loader;
