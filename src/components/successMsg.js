import React from 'react';
import './successMsg.css';

export default () => {
  return (
    <div role="alert" className="c-msg">
      <p>You're now set! But wait...</p>
      <p>There are a few things to clean up first:</p>
      <ul>
        <li>
          <code>REACT_APP_CTF_CMA_TOKEN</code> has to be removed from the
          Netlify build settings and should be revoked in Contentful
        </li>
        <li>
          the defined <code>postinstall</code> script inside of the{' '}
          <code>package.json</code> which imported the content can be removed
        </li>
        <li>
          the script <code>./scripts/setup.sh</code> can be removed
        </li>
        <li>
          and lastly... the component <code>SuccessMsg</code> used in{' '}
          <code>./components/App.js</code> has also done its job!
        </li>
      </ul>
      <p>Have fun!</p>
    </div>
  );
};
