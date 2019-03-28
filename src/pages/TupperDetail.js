import React, { Component } from 'react';
import tupperService from '../lib/tupper-service';
import { Link } from 'react-router-dom';

class TupperDetail extends Component {

  state = {
    tupper: {},
    isLoading: false
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

  render() {
    const { tupper:{name, _id}, isLoading} = this.state;
    return (
      (isLoading) ? <p>Loading...</p> :
      <div>
        <h1>{name}</h1>
        <Link to={`./${_id}/edit`}>Edit</Link>
        <button onClick={this.handleDelete}>Delete</button>
        <button>Buy</button>
      </div>
    );
  }
}

export default TupperDetail;