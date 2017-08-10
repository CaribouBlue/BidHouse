import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { checkVerified } from '../lib/checkToken';
// components
import SignUp from './SignUp';
import Login from './Login';
import Dash from './Dash';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.checkAuth = this.checkAuth.bind(this);
  }

  componentWillMount() {
    this.checkAuth();
  }

  checkAuth() {
    const verified = checkVerified();
    if (verified) {
      this.props.history.push('/app/dash');
    } else if (this.props.location.pathname !== '/app/home/login' && this.props.location.pathname !== '/app/home/signup') {
      this.props.history.push('/app/home/login');
    }
  }

  render() {
    return (
      <Router>
        <div>
          <h1>WELCOME TO AUCTION HOUSE</h1>
          <Route
            path="/app/home/login"
            render={props => (<Login
              checkAuth={this.checkAuth}
              history={props.history}
            />)}
          />
          <Route
            path="/app/home/signup"
            component={SignUp}
          />
        </div>
      </Router>
    );
  }
}
