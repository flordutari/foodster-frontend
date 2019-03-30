import React, { Component } from 'react';
import profileService from '../lib/profile-service';
import { withAuth } from '../providers/AuthProvider';

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
    console.log(id)
    profileService.getProfile(id)
      .then(user => {
        this.setState({
          user,
          isLoading: false
        })
    })
      .catch(err => console.log(err));
  }

  render() {
    const { user: { username, imageUrl }, isLoading } = this.state;
    return (
      (isLoading) ? <p>Loading...</p> :
      <div className="profile-page">
        <div className="profile-card">
          <img className="profile" src={imageUrl} alt={`${username}`}/>
          <div className="profile-text">
            <h2 className="profile">Hi, I'm {username}</h2>
            <div className="profile-valoration">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <p>0.3 km</p>
          </div>
        </div>
        <button>Follow</button>
      </div>
    );
  }
}

export default withAuth(UserProfile);

      