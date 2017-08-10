import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
// components
import MenuBar from './MenuBar';
import Home from './Home';
import About from './About';
import Auction from './Auction';
import Dash from './Dash';

export default class App extends React.Component {
  render() {
    return (
      <Router
        forceRefresh={false}
      >
        <div>
          <Route
            path="/app/"
            component={MenuBar}
          />
          <Route
            exact
            path="/app/"
            render={() =>
              (window.location.hash ? (
                <Redirect to={`/app/${window.location.hash.slice(1)}`} />
              ) : (
                <Redirect to={'/app/home'} />
              ))
            }
          />
          <Route
            path="/app/home"
            component={Home}
          />
          <Route
            path="/app/about"
            component={About}
          />
          <Route
            path="/app/auction"
            component={Auction}
          />
          <Route
            path="/app/dash"
            component={Dash}
          />
        </div>
      </Router>
    );
  }
}
