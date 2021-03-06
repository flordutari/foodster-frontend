import React, { Component } from 'react';
import profileService from '../lib/profile-service';
import { withAuth } from '../providers/AuthProvider';

class Rate extends Component {
  state = {
    user: {}
  }

  componentDidMount = () => {
    this.getUser();
  }

  getUser = () => {
    const { user } = this.props;
    profileService.getProfile(user)
    .then(user => {
      this.setState({
        user
      })
    })
    .catch(err => console.log(err));
  }

  handleRate = () => {
    const { status } = this.state.user;
    let roundedStatus = Math.ceil(status);
    return roundedStatus;
  }

  render() {
    switch(this.handleRate()){
      case 0:
      return (
        <>
          <i className="fas fa-star star-grey"></i>
          <i className="fas fa-star star-grey"></i>
          <i className="fas fa-star star-grey"></i>
          <i className="fas fa-star star-grey"></i>
          <i className="fas fa-star star-grey"></i>
        </>);
      case 1:
      return (
        <>
          <i className="fas fa-star"></i>
          <i className="fas fa-star star-grey"></i>
          <i className="fas fa-star star-grey"></i>
          <i className="fas fa-star star-grey"></i>
          <i className="fas fa-star star-grey"></i>
        </>);
      case 2:
      return (
        <>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star star-grey"></i>
          <i className="fas fa-star star-grey"></i>
          <i className="fas fa-star star-grey"></i>
        </>);
      case 3:
      return (
        <>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star star-grey"></i>
          <i className="fas fa-star star-grey"></i>
        </>);
      case 4:
      return (
        <>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star star-grey"></i>
        </>);
      case 5:
      return (
        <>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </>);
      default:
      return null;
    }
  }
}

export default withAuth(Rate);

