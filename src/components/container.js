import React from 'react';
import './container.css';

export default ({ isSmall, children }) => {
  return (
    <div className={`c-container ${isSmall ? 'c-container--small' : ''}`}>
      {children}
    </div>
  );
};
