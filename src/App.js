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
import Tutorial from './components/tutorial.js';
import NotFound from './components/404.js';

const initialState = getStoredState();

const App = ({ data }) => (
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
            render={_ => <Home initialState={initialState} />}
          />
          <Route
            path="/posts/:slug"
            render={props => <Post {...props} initialState={initialState} />}
          />
          <Route
            path="/tutorial"
            render={props => (
              <Tutorial {...props} initialState={initialState} />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </div>
  </Router>
);

export default App;
