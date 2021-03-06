import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import ErrorComponent from '../components/ErrorComponent';

class Signup extends Component {

  state = {
    username: "",
    password: "",
    email: "",
    error: {}
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const email = this.state.email;

    this.props.signup({ username, password, email })
    .then((error) => {
      this.setState({
          username: "",
          password: "",
          email: "",
          error
      });
    })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password, email, error } = this.state;
    return (
      <div className="signup-page">
        <div className="logo-login">
          <img className="cover-logo" src="./img/logo2.svg" alt="logo"/>
          <h1>foodster</h1>
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <input className="standard-input" type="email" name="email" value={email} onChange={this.handleChange} placeholder="email"/>
          <input className="standard-input" type="text" name="username" value={username} onChange={this.handleChange} placeholder="username"/>
          <input className="standard-input" type="password" name="password" value={password} onChange={this.handleChange} placeholder="password"/>
          <input className="standard-input"type="hidden" id="latitude" name="latitude" value={username} />
          <input className="standard-input"type="hidden" id="longitude" name="longitude" value={username} />
          {error.message ? 
          <ErrorComponent 
          error={error}
          /> : 
          null }
          <input className="signup-button" type="submit" value="Signup" />
        </form>
        <p>Already have account? </p>        
        <Link className="login-link-in-signup" to={"/login"}> Login</Link>
      </div>
    )
  }
}

export default withAuth(Signup);
