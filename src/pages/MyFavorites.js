import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import tupperService from '../lib/tupper-service';
import FavoriteCard from '../components/FavoriteCard'

class MyFavorites extends Component {

  state = {
    favoritesList: [],
  }

  componentDidMount = () => {
    this.getFavoritesList();
  }

  getFavoritesList = () => {
    const { favorites } = this.props.user;
    favorites.map(favoriteId => (
      tupperService.getOne(favoriteId)
      .then(favorite => {
        this.setState({
          favoritesList : [...this.state.favoritesList, favorite]
        })
      })
      .catch(err => console.log(err))
    ))
  }

  render() {
    const { favoritesList } = this.state;
    return (
      <div className="favorites-page">
        <h3>My favorites</h3>
        <div className="all-favorites-cards">
          {favoritesList.map((favorite, index) => (
            <FavoriteCard
            key={`id${index}`}
            name={favorite.name}
            imageUrl={favorite.imageUrl}
            id={favorite._id}
            price={favorite.price}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withAuth(MyFavorites);