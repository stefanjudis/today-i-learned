import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Card from './card.js';
import Container from './container.js';
import Placeholder from './placeholder.js';
import getClient from '../lib/get-contentful-client.js';
import { storeState, getStoredState } from '../lib/store-state.js';

class Post extends Component {
  constructor(props) {
    super(props);
    const { match } = props;

    this.state = getStoredState() || {
      error: null,
      isLoading: true,
      post: {
        fields: {
          publishDate: '\u200B',
          title: '\u200B',
          body: '\u200B \n\b\r\n \u200B \n \u200B \n \u200B'
        }
      },
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

      return (
        <div>
          <Helmet>
            <title>{`${fields.title} – Today I Learned`}</title>
          </Helmet>
          <Link to="/">Home</Link>
          <Container isSmall={true}>
            <Card>
              <Placeholder isLoading={this.state.isLoading}>
                <time>{fields.publishDate}</time>
              </Placeholder>
              <Placeholder isLoading={this.state.isLoading}>
                <h1>{fields.title}</h1>
              </Placeholder>
              <Placeholder isLoading={this.state.isLoading}>
                <ReactMarkdown source={fields.body} />
              </Placeholder>
            </Card>
          </Container>
        </div>
      );
    }
  }
}

export default Post;
