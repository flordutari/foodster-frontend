import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import CategoryCard from '../components/CategoryCard';
import { Link } from 'react-router-dom';

class Categories extends Component {

  render() {
    const categories = ['All', 'Vegetarian', 'Vegan', 'Gluten-free', 'Lactose-free', 'Meat']
    return (
      <>
      {categories.map((item, index) => (
            <CategoryCard 
            key={`id${index}`}
            name={item} 
            />
          ))}
          <Link to='./new'>New</Link>
      </>
      
    );
  }
}

export default withAuth(Categories);