import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

export default () => {
  return (
    <header className="c-header">
      <nav className="c-header__nav">
        Today I learned
        <Link to={'/tutorial/'} className="c-header__button o-btn">
          Set up your own!
        </Link>
      </nav>
    </header>
  );
};
