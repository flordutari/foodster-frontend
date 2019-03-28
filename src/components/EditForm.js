import React, { Component } from 'react';

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

  render() {
    const { name, imageUrl, category, price } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" onChange={this.handleChange} value={name}/>
        <label>Image</label>
        <input type="text" name="imageUrl" onChange={this.handleChange} value={imageUrl}/>
        <label>Category</label>
        <select name="category" onChange={this.handleChange} multiple={true} value={category}>
          <option value="All">All</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Gluten-free">Gluten-free</option>
          <option value="Lactose-free">Lactose-free</option>
          <option value="Meat">Meat</option>
        </select>
        <label>Value</label>
        <select name="value" onChange={this.handleChange} value={price}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button type="submit">Edit</button>
      </form>
    );
  }
}

export default EditForm;