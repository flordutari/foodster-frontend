import React, { Component } from 'react';

class CreateForm extends Component {

  state = {
    name: '',
    imageUrl: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
    category: ['all', ],
    price: '1',
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
      name: '',
      imageUrl: '',
      category: ['all', ],
      price: '',
    })
  }

  render() {
    const {name, imageUrl, category, price} = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name</label>
        <input className="create-edit-input" type="text" name="name" onChange={this.handleChange} value={name} />
        <label>Image</label>
        <input className="create-edit-input" type="text" name="imageUrl" onChange={this.handleChange} value={imageUrl}/>
        <label>Category</label>
        <select name="category" onChange={this.handleChange} multiple={true} value={category}>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="meat">Meat</option>
          <option value="pasta">Pasta</option>
          <option value="gluten-free">Gluten-free</option>
        </select>
        <label>Value</label>
        <select name="price" onChange={this.handleChange} value={price}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button type="submit">Create </button>
      </form>
    );
  }
}

export default CreateForm;
