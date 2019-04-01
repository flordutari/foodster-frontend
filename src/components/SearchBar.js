import React, { Component } from 'react';

class SearchBar extends Component {
  state = {
    name:""
  };

  handleChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value
    })
    this.props.change(this.state.name);
  };

  render() {
    return (
      <div>
        <input 
        className="input search-bar"
        placeholder="Search..." 
        onChange={(e)=>this.handleChange(e)}
        value={this.state.search}
        type="text"
        name="name"
        />
      </div>
    );
  }
}

export default SearchBar;