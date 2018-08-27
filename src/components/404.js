import React from 'react';
import { Helmet } from 'react-helmet';

export default ({ location }) => (
  <div>
    <Helmet>
      <title>404 - Oh noesss!</title>
    </Helmet>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);
