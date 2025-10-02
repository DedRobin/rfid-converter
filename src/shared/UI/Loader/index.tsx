import './style.css';
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="double-bounce1" />
      <div className="double-bounce2" />
    </div>
  );
};

export default Loader;
