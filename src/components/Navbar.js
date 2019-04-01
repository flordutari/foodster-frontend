import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import logoutImg from '../img/logout.png';

class Navbar extends Component {

  render() {
    const { user, logout } = this.props;
    const { tickets, imageUrl, username } = user;
    return (
      <nav>
        <div className="logout-button">
          <img onClick={logout} src={logoutImg} alt=""/>
        </div>
        <Link to="/profile">
          <div className="current-user">
            <p>{tickets}  <i className="fas fa-ticket-alt"></i></p>
            <p>{username}</p>
            <img src={imageUrl} alt="" />
          </div>
        </Link>
      </nav>
    )
  }
}

export default withAuth(Navbar);