import React, { Component } from 'react';

class CreateForm extends Component {

  state = {
    name: '',
    image: '',
    value: ''
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
      name: '',
      imageUrl: '',
      value: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="name" onChange={this.handleChange}/>
        <input type="text" name="imageUrl" onChange={this.handleChange}/>
        <input type="text" name="value" onChange={this.handleChange}/>
        {/* <select name="category" multiple>
          <option selected value="All">All</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Gluten-free">Gluten-free</option>
          <option value="Lactose-free">Lactose-free</option>
          <option value="Meat">Meat</option>
        </select>
        <select name="value" value={this.state.value}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select> */}
        <button type="submit">Create</button>
      </form>
    );
  }
}

export default CreateForm;


// handleSubmit = (e) => {
//   e.preventDefault();
//   this.props.onSubmit(this.state);
//   this.setState({
//     name: this.props.value.name,
//     imageUrl: this.props.value.imageUrl,
//     category: this.props.value.category,
//   })
// }

// <select id="time-select" name="showtime" value="{{showtime}}">
//             <option value="17:00">17:00</option>
//             <option value="18:30">18:30</option>
//             <option value="20:00">20:00</option>
//             <option value="21:30">21:30</option>
//             <option value="23:00">23:00</option>
//           </select>