import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import ErrorComponent from '../components/ErrorComponent';

class Login extends Component {
  
  state = {
    username: "",
    password: "",
    status: "",
    error: {}
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.login({ username, password })
    .then((error) => {
      this.setState({
        error
      })
    })
  }
  
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password, error } = this.state;
    return (
      <div className="login-page">
        <div className="logo-login">
          <img className="cover-logo" src="./img/logo2.svg" alt="logo"/>
          <h1>foodster</h1>
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <input className="standard-input" type="text" name="username" value={username} onChange={this.handleChange} placeholder="username"/>
          <input className="standard-input"type="password" name="password" value={password} onChange={this.handleChange} placeholder="password"/>
          {error.message ? 
          <ErrorComponent 
          error={error}
          /> : 
          null }
          <input className="login-button" type="submit" value="Login" />
        </form>
        <Link className="signup-link-in-login" to='/signup'>or Signup</Link>
      </div>
    )
  }
}

export default withAuth(Login);
