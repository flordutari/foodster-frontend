import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

class MyProfile extends Component {

  render() {
    const { username } = this.props.user;
    return (
      <div>
        <h1>{username}</h1>
      </div>
    );
  }
}

export default withAuth(MyProfile);