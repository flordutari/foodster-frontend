import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class CategoryCard extends Component {
  render() {
    const { name, image } = this.props;
    return (
      <Link className="category-card" to="/tuppers">
        <h2>{name}</h2>
        <img src={image} alt="meat"/>
      </Link>
    );
  }
}

export default CategoryCard;