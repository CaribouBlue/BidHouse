import React from 'react';
import axios from 'axios';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      repassword: '',
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
    if (this.state.password !== this.state.repassword) {
      alert('passwords do not match');
    } else {
      axios.post('/api/signup', {
        username: this.state.username,
        password: this.state.password,
      })
        .then((res) => {
          alert(res.data);
          if (res.data === 'signed up') {
            this.props.history.push(
              '/app/home/login'
            )
          }
        })
        .catch(console.error.bind(console));
    }
  }

  render() {
    return (
      <div className="flex-col-center">
        <h3 className="sub-header">Sign Up</h3>
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
          <input
            type="password"
            placeholder="re-enter password"
            name="repassword"
            value={this.state.repassword}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        <button
          onClick={() =>
            this.props.history.push(
              '/app/home/login'
            )
          }
        >Login</button>
      </div>
    );
  }
}
