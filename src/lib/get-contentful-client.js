const contentful = require('contentful');

export default ({
  REACT_APP_CTF_SPACE: space,
  REACT_APP_CTF_CDA_TOKEN: accessToken,
  REACT_APP_CTF_CPA_TOKEN,
  CONTENTFUL_CMA_TOKEN,
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

  if (CONTENTFUL_CMA_TOKEN) {
    alert(
      "You're done with the setup. 🎉🎉🎉 \nPlease remove `CONTENTFUL_CMA_TOKEN` from the Netlify build environment variables."
    );
  }

  return contentful.createClient(config);
};
