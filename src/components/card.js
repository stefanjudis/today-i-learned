import React from 'react';
import './card.css';

export const Card = ({ children }) => <div className="c-card">{children}</div>;
export const CardHeader = ({ className, children }) => (
  <div className={`c-cardHeader ${className}`}>{children}</div>
);
export const CardBorder = ({ className }) => (
  <div class={`c-cardBorder ${className}`} />
);
