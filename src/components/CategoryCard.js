import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class CategoryCard extends Component {
  render() {
    return (
      <Link to="/tuppers">
        <img src="../img/logo3.svg" alt="meat"/>
        <h2>{this.props.name}</h2>
      </Link>
    );
  }
}

export default CategoryCard;