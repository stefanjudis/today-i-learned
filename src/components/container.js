import React from 'react';
import './container.css';

export default ({ isSmall, children }) => {
  return <div className="c-container">{children}</div>;
};
