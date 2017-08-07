import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
// components
import MenuBar from './MenuBar';
import Home from './Home';
import About from './About';

export default class App extends React.Component {
  render() {
    return (
      <Router
        forceRefresh={false}
      >
        <div>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}
