import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './App.css';
import './Objects.css';

// regular components
import Container from './components/container.js';
import Header from './components/header.js';

// route components
import Home from './components/home.js';
import Post from './components/post.js';
import NotFound from './components/404.js';

const App = ({ data }) => (
  <Router>
    <div>
      <Helmet>
        <meta charSet="utf-8" />
      </Helmet>
      <Container>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} data={data} />
          <Route path="/posts/:slug" component={Post} data={data} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </div>
  </Router>
);

export default App;
