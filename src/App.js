import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './App.css';
import './Objects.css';

// helpers
import { getStoredState } from './lib/store-state.js';

// regular components
import Container from './components/container.js';
import Header from './components/header.js';

// route components
import Home from './components/home.js';
import Post from './components/post.js';
import Page from './components/page';
import NotFound from './components/404.js';

const App = () => (
  <Router>
    <div>
      <Helmet>
        <meta charSet="utf-8" />
      </Helmet>
      <Container>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={_ => <Home initialState={getStoredState()} />}
          />
          <Route
            path="/posts/:slug"
            render={props => (
              <Post {...props} initialState={getStoredState()} />
            )}
          />
          <Route
            path="/:slug"
            render={props => (
              <Page {...props} initialState={getStoredState()} />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </div>
  </Router>
);

export default App;
