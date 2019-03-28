import React, { Component } from 'react';
import tupperService from '../lib/tupper-service';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class TupperDetail extends Component {

  state = {
    tupper: {},
    isLoading: true
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

  handleDelete = () => {
    const { id } = this.props.match.params;
    tupperService.deleteTupper(id)
      .then(result => {
        console.log(result);
        this.props.history.push('/tuppers');
      })
      .catch(err => console.log(err));
  }

  handleBuy = (available) => {
    const { id } = this.props.match.params;
    const { _id } = this.props.user;
    tupperService.editTupperStatus(
      {available: this.state.tupper.available}, 
      {owner: _id},
      id)  
      .then((result) => {
        console.log(result);
        this.props.history.push('/tuppers');
      })
      .catch(err => console.log(err));
  }

  render() {
    const { tupper:{name, _id, creator}, isLoading } = this.state;
    console.log(this.props);
    return (
      (isLoading) ? <p>Loading...</p> :
      <div>
        <h1>{name}</h1>
        {(creator === (this.props.user._id)) ?
        <>
          <Link to={`./${_id}/edit`}>Edit</Link> 
          <button onClick={this.handleDelete}>Delete</button> 
        </> :
        <button onClick={this.handleBuy}>Buy</button>}
      </div>
    );
  }
}

export default withAuth(TupperDetail);