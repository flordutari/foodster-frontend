import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

class Categories extends Component {

  render() {
    const { user } = this.props
    return (
      <div>
        <h1>Welcome {user.username}</h1>
        <h1>Welcome {user.username}</h1>
        <h1>Welcome {user.username}</h1>
        <h1>Welcome {user.username}</h1>
        <h1>Welcome {user.username}</h1>
        <h1>Welcome {user.username}</h1>
        <h1>Welcome {user.username}</h1>
        <h1>Welcome {user.username}</h1>
      </div>
    );
  }
}

export default withAuth(Categories);