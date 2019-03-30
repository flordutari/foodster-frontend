import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

class EditProfileForm extends Component {

  state = {
    username: this.props.value.username,
    imageUrl: this.props.value.imageUrl,
    email: this.props.value.email,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      username: this.props.value.username,
      imageUrl: this.props.value.imageUrl,
      email: this.props.value.email,
    })
  }

  render() {
    const { username, imageUrl, email } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name</label>
        <input type="text" name="username" onChange={this.handleChange} value={username}/>
        <label>Image</label>
        <input type="text" name="imageUrl" onChange={this.handleChange} value={imageUrl}/>
        <label>Email</label>
        <input type="email" name="email" onChange={this.handleChange} value={email}/>
        <button type="submit">Edit</button>
      </form>
    );
  }
}

export default withAuth(EditProfileForm);