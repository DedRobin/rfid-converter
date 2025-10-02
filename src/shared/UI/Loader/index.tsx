import './style.css';
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );
};

export default Loader;
