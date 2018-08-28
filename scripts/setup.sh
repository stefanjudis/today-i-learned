# Contentful import should only run on the initial deploy to netlify button run
# and also not in local environment (NETLIFY_BUILD_BASE won't be available locally)
if [ -n "$REACT_APP_CTF_CMA_TOKEN" ] && [ -n "$NETLIFY_BUILD_BASE" ]
then
  TEST_ENTRY=4PZ4GqTqFWGg6qSaUCQsIS;
  RESPONSE_CODE=$(
    curl "https://cdn.contentful.com/spaces/$REACT_APP_CTF_SPACE/environments/master/entries/$TEST_ENTRY?access_token=$REACT_APP_CTF_CDA_TOKEN" \
        --write-out %{http_code} \
        --request GET \
        --silent \
        --output /dev/null \
  )

  # "Evaluate" space emptiness with querying for a random entry
  # if random entry is not there contentful-import is performed
  if [ "$RESPONSE_CODE" == "404" ]
  then
    ./node_modules/.bin/contentful space import --content-file ./contentful/export.json --management-token $REACT_APP_CTF_CMA_TOKEN --space-id $REACT_APP_CTF_SPACE
  else
    echo "It looks like the Contentful space you set is not empty?"
  fi
fi
