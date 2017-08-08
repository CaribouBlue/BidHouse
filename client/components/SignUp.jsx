import React from 'react';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      repassword: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const obj = {};
    obj[target.name] = target.value;
    this.setState(obj);
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h3>SIGN UP</h3>
        <form>
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
        </form>
      </div>
    );
  }
}
