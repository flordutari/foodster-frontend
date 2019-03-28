import React, { Component } from 'react';

class EditForm extends Component {

  state = {
    name: this.props.value.name,
    imageUrl: this.props.value.imageUrl,
    category: this.props.value.category,
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
      name: this.props.value.name,
      imageUrl: this.props.value.imageUrl,
      category: this.props.value.category,
    })
  }

  render() {
    const { name, imageUrl, category } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input value={name} onChange={this.handleChange} name="name" type="text"/>
        <input value={category} onChange={this.handleChange} name="category" type="text"/>
        <input value={imageUrl} onChange={this.handleChange} name="imageUrl" type="text"/>
        <button type="submit">Edit</button>
      </form>
    );
  }
}

export default EditForm;