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

export default class App extends React.Component {
  render() {
    return (
      <Router
        forceRefresh={false}
      >
        <div>
          <MenuBar />
          <Route
            exact
            path="/app/"
            render={() =>
              (window.location.hash ? (
                <Redirect to={`/app/${window.location.hash.slice(1)}`} />
              ) : (
                <Home />
              ))
            }
          />
          <Route
            path="/app/about"
            component={About}
          />
          <Route
            path="/app/auction"
            render={() => (
              <Auction room="room1" />
            )}
          />
        </div>
      </Router>
    );
  }
}
