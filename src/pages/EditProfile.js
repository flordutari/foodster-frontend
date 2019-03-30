import React, { Component } from 'react';
import profileService from '../lib/profile-service';
import authService from '../lib/auth-service';
import EditProfileForm from '../components/EditProfileForm'

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

  handleSubmit = (user) => {
    profileService.editProfile(user)
    .then((result) => {
      console.log(result);
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

export default EditProfile;
