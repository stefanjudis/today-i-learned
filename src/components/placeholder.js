import React from 'react';
import './placeholder.css';

export default ({ isLoading, children }) => {
  return (
    <div
      className={`c-placeholder ${isLoading ? `c-placeholder--loading` : ''}`}
    >
      {children}
    </div>
  );
};
