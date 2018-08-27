const contentful = require('contentful');

export default ({
  REACT_APP_CTF_SPACE: space,
  REACT_APP_CTF_CDA_TOKEN: accessToken,
  REACT_APP_CTF_CPA_TOKEN,
  NODE_ENV
}) => {
  const config = {
    space,
    accessToken
  };

  if (NODE_ENV !== 'production') {
    config.accessToken = REACT_APP_CTF_CPA_TOKEN;
    config.host = 'preview.contentful.com';
  }

  return contentful.createClient(config);
};
