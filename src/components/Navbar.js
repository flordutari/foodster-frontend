import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Navbar extends Component {
  render() {
    const { isLogged, user, logout } = this.props;
    const { username, imageUrl } = user;
    if (isLogged) {
      return (
        <nav>
          <div id="menu-toggle">
            <input type="checkbox"/>
              <span></span>
              <span></span>
              <span></span>
            <ul id="menu">
              <li><Link to="">Escape Rooms</Link></li>
              <li><Link to="">Events</Link></li>
              <li><Link to="">My Profile</Link></li>
              <li onClick={logout}>Logout</li>
            </ul>
          </div>
          <div className="current-user">
            <p>{ username }</p>
            <img src={ imageUrl } alt=""/>
          </div>
        </nav>
      )
    }
  }
}

export default withAuth(Navbar);