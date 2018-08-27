# Contentful import should only run on the initial deploy to netlify button run
if [[ -v CONTENTFUL_CMA_TOKEN ]] && [ -v NETLIFY_BUILD_BASE ]
then
  ./node_modules/.bin/contentful space import --content-file ./contentful/export.json --management-token $CONTENTFUL_CMA_TOKEN --space-id $REACT_APP_CTF_SPACE
fi
