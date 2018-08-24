import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import Skeleton from 'react-loading-skeleton';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardBorder } from './card.js';
import Date from './date.js';
import Container from './container.js';
import getClient from '../lib/get-contentful-client.js';
import { storeState } from '../lib/store-state.js';

class Post extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    const { match } = props;

    this.state = props.initialState || {
      error: null,
      isLoading: true,
      post: { fields: {} },
      slug: match.params.slug
    };

    // needed for react-snap
    window.snapSaveState = () => {
      storeState(this.state);
    };
  }

  componentDidMount() {
    this.state.isLoaded ||
      getClient(process.env)
        .getEntries({
          content_type: 'post',
          'fields.slug': this.state.slug
        })
        .then(({ items }) => {
          if (items[0]) {
            this.setState({
              post: items[0],
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
    const { error, post } = this.state;

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
      const { fields } = post;

      console.log(fields);
      return (
        <div>
          <Helmet>
            <title>{`${fields.title} | Today I Learned`}</title>
          </Helmet>
          <Link to="/">Home</Link>
          <Container isSmall={true}>
            <Card>
              {fields.category ? (
                <CardBorder
                  className={`o-gradient-${fields.category.fields.slug}`}
                />
              ) : (
                ''
              )}
              {fields.publishDate ? (
                <Date dateString={fields.publishDate} />
              ) : (
                <Skeleton />
              )}
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

export default Post;
