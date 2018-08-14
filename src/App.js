import React, { Component } from 'react';
import getClient from './lib/get-contentful-client.js';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    console.log(process.env);
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
          <h1>Today I learned</h1>
          <ul>
            {items.map(({ sys, fields }) => (
              <li key={sys.id}>
                {fields.title}
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

export default App;
