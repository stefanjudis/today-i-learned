import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import getClient from '../lib/get-contentful-client.js';
import { storeState, getStoredState } from '../lib/store-state.js';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = getStoredState() || {
      error: null,
      isLoaded: false,
      items: []
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
          content_type: 'post'
        })
        .then(({ items }) => {
          this.setState({
            items,
            isLoaded: true
          });
        })
        .catch(error => {
          this.setState({
            error,
            isLoaded: true
          });
        });
  }

  render() {
    const { error, items, isLoaded } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Helmet>
            <title>Today I learned</title>
          </Helmet>
          <h1>Today I learned</h1>
          <ul>
            {items.map(({ sys, fields }) => (
              <li key={sys.id}>
                <Link to={`/posts/${fields.slug}/`}>{fields.title}</Link>
                <br />
                {fields.publishDate}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default Home;
