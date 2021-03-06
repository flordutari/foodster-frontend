import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

class EditProfileForm extends Component {

  state = {
    username: this.props.value.username,
    imageUrl: this.props.value.imageUrl,
    email: this.props.value.email,
    description: this.props.value.description,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      username: this.props.value.username,
      imageUrl: this.props.value.imageUrl,
      email: this.props.value.email,
      description: this.props.value.description,
    })
  }

  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
    }
  handleUploadSuccess = (filename) => {
    this.setState({image: filename, progress: 100, isUploading: false});
    firebase.storage().ref('profileImages').child(filename).getDownloadURL().then(url => this.setState({imageUrl: url}));
    };

  render() {
    const { username, email, description } = this.state;
    return (
      <form id="edit-profile-form" onSubmit={this.handleSubmit}>
        <label>Name</label>
        <input className="create-edit-input" type="text" name="username" onChange={this.handleChange} value={username}/>
        <br/>
        <label>Image</label>
        {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.imageUrl && <img className="profile-edit-picture" src={this.state.imageUrl} alt=""/>}
          <FileUploader
          className="firebase"
          accept="image/*"
          name="imageUrl"
          randomizeFilename
          storageRef={firebase.storage().ref('profileImages')}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
          />
        <label>Email</label>
        <input type="email" name="email" onChange={this.handleChange} value={email}/>
        <label>Description</label>
        <br/>
        <textarea className="profile-textarea" name="description" placeholder="Tell something about you..." tabindex="5" onChange={this.handleChange} value={description}></textarea>
        <button type="submit">Edit</button>
      </form>
    );
  }
}

export default withAuth(EditProfileForm);
