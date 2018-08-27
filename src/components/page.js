import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Skeleton from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown';

import getClient from '../lib/get-contentful-client.js';

import SSRComponent from './SSRComponent.js';
import Container from './container.js';
import { Card, CardBorder } from './card.js';

class Page extends SSRComponent {
  constructor(props) {
    super(props);
    const { match } = props;

    this.state = props.initialState || {
      error: null,
      isLoading: true,
      page: { fields: {} },
      slug: match.params.slug
    };
  }

  componentDidMount() {
    this.state.isLoaded ||
      getClient(process.env)
        .getEntries({
          content_type: 'page',
          'fields.slug': this.state.slug
        })
        .then(({ items }) => {
          if (items[0]) {
            this.setState({
              page: items[0],
              isLoading: false
            });
          } else {
            this.setState({
              error: new Error('Not found')
            });
          }
        })
        .catch(error => {
          this.setState({
            error,
            isLoading: false
          });
        });
  }

  render() {
    const { error, page } = this.state;

    if (error) {
      return (
        <Redirect
          to={{
            pathname: '/not-found',
            state: { from: this.props.location }
          }}
        />
      );
    } else {
      const { fields } = page;

      return (
        <div className="c-post">
          <Helmet>
            <title>{`${fields.title} | Today I Learned`}</title>
          </Helmet>
          <Link className="o-paddedLink" to="/">
            Go back to Home
          </Link>
          <Container isSmall={true}>
            <Card>
              <CardBorder className={`o-gradient-${fields.slug}`} />
              <h1>{fields.title || <Skeleton />}</h1>
              {fields.body ? (
                <ReactMarkdown source={fields.body} />
              ) : (
                <Skeleton count="5" />
              )}
            </Card>
          </Container>
        </div>
      );
    }
  }
}

export default Page;
