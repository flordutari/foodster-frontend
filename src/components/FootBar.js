import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import searchLogo from '../img/search.svg';
import likeLogo from '../img/like.svg';
import plusLogo from '../img/plus.svg';
import lunchLogo from '../img/lunch-box.svg';
import userLogo from '../img/user.svg'

class FootBar extends Component {
  render() {
    // const { user, logout } = this.props;
    // const { username } = user;
    return (
      <div id="footbar">
        <Link to="/tuppers/search"><img src={searchLogo} alt=""/></Link>
        <Link to="/tuppers/favorites"><img src={likeLogo} alt=""/></Link>
        <Link to="/tuppers/new"><img src={plusLogo} alt=""/></Link>
        <Link to="/tuppers/all"><img src={lunchLogo} alt=""/></Link>
        <Link to="/profile"><img src={userLogo} alt=""/></Link>
      </div>
    )
  }
}

export default withAuth(FootBar);
