# Contentful import should only run on the initial deploy to netlify button run
if [ -n "$CONTENTFUL_CMA_TOKEN" ] && [ -n "$NETLIFY_BUILD_BASE" ]
then
  ./node_modules/.bin/contentful space import --content-file ./contentful/export.json --management-token $CONTENTFUL_CMA_TOKEN --space-id $REACT_APP_CTF_SPACE
else
  echo "I guess you're all set and can remove this script, the postinstall call and the contentful folder";
fi
