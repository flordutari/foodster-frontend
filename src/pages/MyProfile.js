import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';

class MyProfile extends Component {

  render() {
    const { username, imageUrl } = this.props.user;
    return (
      <div className="profile-page">
        <div className="profile-card">
          <img className="profile" src={imageUrl} alt={`${username}`}/>
          <div className="profile-text">
            <h2 className="profile">{username}</h2>
            <div className="profile-valoration">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <p>0.3 km</p>
          </div>
          <Link to={`./profile/edit`}><i className="fas fa-edit"></i></Link>
        </div>
      </div>
    );
  }
}

export default withAuth(MyProfile);