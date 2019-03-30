import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import CategoryCard from '../components/CategoryCard';
import categories from '../data/categories.json';

class Categories extends Component {

  render() {
    return (
      <div className="categories-page">
        {categories.map((item, index) => (
          <CategoryCard 
          key={`id${index}`}
          name={item.name}
          image={item.imageUrl}
          link={item.link}
          />
          ))}
      </div>
      
    );
  }
}

export default withAuth(Categories);