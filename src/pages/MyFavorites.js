import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import tupperService from '../lib/tupper-service';
import { Link } from 'react-router-dom';

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
        <h2>My favorites</h2>
        {favoritesList.map(favorite => (
          <>
            <Link to={`/tuppers/${favorite._id}`}><p>{favorite.name}</p></Link>
          </>
        ))}
      </div>
    );
  }
}

export default withAuth(MyFavorites);