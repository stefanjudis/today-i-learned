# To perform an import a CMA token has to be present
# also the import shouldn't run when you set the project up
# in your local dev environment (NETLIFY_BUILD_BASE won't be available locally)
if [ -n "$REACT_APP_CTF_CMA_TOKEN" ] && [ -n "$NETLIFY_BUILD_BASE" ]
then
  TEST_ENTRY_ID=4PZ4GqTqFWGg6qSaUCQsIS;
  RESPONSE_CODE=$(
    curl "https://cdn.contentful.com/spaces/$REACT_APP_CTF_SPACE/environments/master/entries/$TEST_ENTRY_ID?access_token=$REACT_APP_CTF_CDA_TOKEN" \
        --write-out %{http_code} \
        --request GET \
        --silent \
        --output /dev/null \
  )

  # "Evaluate" space emptiness with querying for a random entry
  # if random entry is not there contentful-import is performed
  if [ $RESPONSE_CODE -eq 404 ]
  then
    ./node_modules/.bin/contentful space import --content-file ./contentful/export.json --management-token $REACT_APP_CTF_CMA_TOKEN --space-id $REACT_APP_CTF_SPACE
  else
    echo "It looks like the Contentful space you set is not empty?"
  fi
else
  echo "No CMA Token found and/or not running on Netlify... Nothing to do here!"
fi
