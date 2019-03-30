import React, { Component } from 'react';
import profileService from '../lib/profile-service';
import authService from '../lib/auth-service';
import EditProfileForm from '../components/EditProfileForm';
import { withAuth } from '../providers/AuthProvider';

class EditProfile extends Component {

  state = {
    user: {},
    isLoading: true
  }

  componentDidMount() {
    this.getCurrentUser();
  }
  
  getCurrentUser = () => {
    authService.me()
    .then(user => {
      this.setState({
        user,
        isLoading: false
      })
    })
    .catch(err => console.log(err));
  }

  handleSubmit = (userEdit) => {
    profileService.editProfile(userEdit)
    .then(user => {
      this.props.setUser(user);
      this.props.history.push('/profile');
    })
    .catch(err => console.log(err));
  }

  render() {
    const {isLoading} = this.state;
    return (
      (isLoading) ? <p>Loading...</p> : 
        <div>
          <EditProfileForm onSubmit={this.handleSubmit} value={this.state.user}/>
        </div>
    )
  }
}

export default withAuth(EditProfile);
