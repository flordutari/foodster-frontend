import React, { Component } from 'react';
import profileService from '../lib/profile-service';
import EditProfileForm from '../components/EditProfileForm';
import { withAuth } from '../providers/AuthProvider';

class EditProfile extends Component {

  handleSubmit = (userEdit) => {
    profileService.editProfile(userEdit)
    .then(user => {
      this.props.setUser(user);
      this.props.history.push('/profile');
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
        <div className="edit-profile">
          <h2 className="edit-form">Edit your profile</h2>
          <EditProfileForm onSubmit={this.handleSubmit} value={this.props.user}/>
        </div>
    )
  }
}

export default withAuth(EditProfile);
