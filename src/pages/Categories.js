import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import CategoryCard from '../components/CategoryCard';

class Categories extends Component {

  render() {
    const categories = ['All', 'Vegetarian', 'Vegan', 'Gluten-free', 'Lactose-free', 'Meat']
    return (
      categories.map((item) => (
        <div>
          <CategoryCard name={item}/>
        </div>
      ))
    );
  }
}

export default withAuth(Categories);