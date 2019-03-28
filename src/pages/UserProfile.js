import React, { Component } from 'react';
import authService from '../lib/auth-service';

class UserProfile extends Component {
  
  state = {
    user: {},
    isLoading: true
  }

  componentDidMount = () => {
    this.getUserProfile();
  }
  
  getUserProfile = () => {
    const { id } = this.props.match.params;
    authService.getProfile(id)
      .then(user => {
        this.setState({
          user,
          isLoading: false
        })
    })
      .catch(err => console.log(err));
  }

  render() {
    const { user: { username }, isLoading } = this.state;
    return (
      (isLoading) ? <p>Loading...</p> :
      <div>
        <h1>{username}</h1>
        <button>Follow</button>
      </div>
    );
  }
}

export default UserProfile;