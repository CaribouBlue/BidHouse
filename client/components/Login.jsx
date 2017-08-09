import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    const obj = {};
    obj[target.name] = target.value;
    this.setState(obj);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.get('/api/login', {
      params: {
        username: this.state.username,
        password: this.state.password,
      },
    })
      .then((res) => {
        localStorage.setItem('auctionHouse', JSON.stringify(res.data));
        // this.props.checkAuth();
        this.props.history.push('/app/home');
      })
      .catch(console.error.bind(console));
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <form
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            placeholder="username"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        <button
          onClick={() =>
            this.props.history.push(
              '/app/home/signup'
            )
          }
        >Sign Up</button>
      </div>
    );
  }
}
