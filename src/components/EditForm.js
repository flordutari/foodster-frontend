import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

class EditForm extends Component {

  state = {
    name: this.props.value.name,
    imageUrl: this.props.value.imageUrl,
    category: this.props.value.category,
    price: this.props.value.price
  }

  handleChange = (e) => {
    if (e.target.name === 'category') {
      const options = e.target.options;
      const value = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
        value.push(options[i].value);
        }
      }
      this.setState({
        category: value,
      })
    } else {
      this.setState({
        [e.target.name] : e.target.value,
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      name: this.props.value.name,
      imageUrl: this.props.value.imageUrl,
      category: this.props.value.category,
      price: this.props.value.price
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
    firebase.storage().ref('tupperImages').child(filename).getDownloadURL().then(url => this.setState({imageUrl: url}));
    };

  render() {
    const { name, category, price } = this.state;
    return (
      <form id="edit-form" onSubmit={this.handleSubmit}>
        <label>Name</label>
        <input className="create-edit-input" type="text" name="name" onChange={this.handleChange} value={name}/>
        <br/>
        <label>Category</label>
        <select name="category" onChange={this.handleChange} multiple={true} value={category}>
          <option value="All">All</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Gluten-free">Gluten-free</option>
          <option value="Lactose-free">Lactose-free</option>
          <option value="Meat">Meat</option>
        </select>
        <br/>
        <label>Value</label>
        <select name="price" onChange={this.handleChange} value={price}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br/>
        <label>Image</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.imageUrl && <img className="tupper-edit-picture" src={this.state.imageUrl} alt=""/>}
          <FileUploader
          className="firebase"
          accept="image/*"
          name="imageUrl"
          randomizeFilename
          storageRef={firebase.storage().ref('tupperImages')}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
          />
        <button className="edit" type="submit">Edit</button>
      </form>
    );
  }
}

export default EditForm;