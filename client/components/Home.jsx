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

    this.state = {
      verified: false,
    };

    this.checkAuth = this.checkAuth.bind(this);
  }

  componentWillMount() {
    this.checkAuth();
  }

  checkAuth() {
    console.log('checking auth ...');
    console.log('current state: ', this.state);
    const verified = checkVerified();
    console.log('verified: ', verified);
    if (verified) {
      // this.props.history.push('/app/home/dash');
    } else {
      // this.props.history.push('/app/home/login');
    }
    this.setState({ verified });
  }

  render() {
    return (
      <Router>
        <div>
          <h1>WELCOME TO AUCTION HOUSE</h1>
          <Route
            path="/app/home/login"
            render={context => (<Login
              checkAuth={this.checkAuth}
              history={context.history}
            />)}
          />
          <Route
            path="/app/home/signup"
            component={SignUp}
          />
          <Route
            path="/app/home/dash"
            component={Dash}
          />
        </div>
      </Router>
    );
  }
}
