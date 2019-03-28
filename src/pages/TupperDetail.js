import React, { Component } from 'react';
import tupperService from '../lib/tupper-service';
// import authService from '../lib/auth-service';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class TupperDetail extends Component {

  state = {
    
    tupper: {},
    isLoading: true,
    favorite: false
  }

  componentDidMount() {
    this.getOneTupper();
  }
  
  getOneTupper = () => {
    const { id } = this.props.match.params;
    tupperService.getOne(id)
      .then(tupper => {
        this.setState({
          tupper,
          isLoading: false
        })
    })
      .catch(err => console.log(err));
  }

  // getCurrentUser = () => {
  //   const { _id } = this.props.user;
  //   authService.getProfile(_id)
  //     .then(user => {
  //       this.setState({
  //         user,
  //         isLoading: false
  //       })
  //   })
  //     .catch(err => console.log(err));
  // }

  handleDelete = () => {
    const { id } = this.props.match.params;
    tupperService.deleteTupper(id)
      .then(result => {
        console.log(result);
        this.props.history.push('/tuppers');
      })
      .catch(err => console.log(err));
  }

  handleTransaction = () => {
    const { id } = this.props.match.params;
    const { tickets, _id } = this.props.user;
    const { price, available } = this.state.tupper;
    console.log(this.props)
    console.log(tickets, price)
    if (tickets >= price) {
    tupperService.editTupperBought(
      {available: available,
      owner: _id,
      tickets: (tickets - price)
      },
      id)
      .then((result) => {
        console.log(result);
        this.props.history.push('/tuppers');
      })
      .catch(err => console.log(err));
    }
  }

  handleFavorite = () => {
    this.setState({
      favorite: !this.state.favorite
    })
  }

  render() {
    const { tupper:{name, _id, creator}, isLoading, favorite } = this.state;
    return (
      (isLoading) ? <p>Loading...</p> :
      <div>
        <h1>{name}</h1>
        {(creator === (this.props.user._id)) ?
        <>
          <Link to={`./${_id}/edit`}>Edit</Link> 
          <button onClick={this.handleDelete}>Delete</button> 
        </> :
        <>
          {(!favorite) ?
            <button onClick={this.handleFavorite}>Fav</button> :
            <button onClick={this.handleFavorite}>NotFav</button>}
          <button onClick={this.handleTransaction}>I want it!</button>
        </>}
      </div>
    );
  }
}

export default withAuth(TupperDetail);