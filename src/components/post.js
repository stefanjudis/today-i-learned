import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import getClient from '../lib/get-contentful-client.js';

class Post extends Component {
  constructor(props) {
    super(props);
    const { match } = props;

    this.state = {
      error: null,
      isLoaded: false,
      post: null,
      slug: match.params.slug
    };
  }

  componentDidMount() {
    getClient(process.env)
      .getEntries({
        content_type: 'post',
        'fields.slug': this.state.slug
      })
      .then(({ items }) => {
        if (items[0]) {
          this.setState({
            post: items[0],
            isLoaded: true
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
          isLoaded: true
        });
      });
  }

  render() {
    const { error, post, isLoaded } = this.state;

    if (error) {
      return (
        <Redirect
          to={{
            pathname: '/not-found',
            state: { from: this.props.location }
          }}
        />
      );
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const { fields } = post;

      return (
        <div>
          <Helmet>
            <title>{`${fields.title} – Today I Learned`}</title>
          </Helmet>
          <Link to="/">Home</Link>
          <h1>{fields.title}</h1>
          <ReactMarkdown source={fields.body} />
        </div>
      );
    }
  }
}

export default Post;
