import React, { Component } from 'react';
import tupperService from '../lib/tupper-service';
import EditForm from '../components/EditForm'

class EditTupper extends Component {

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

  handleSubmit = (tupper) => {
    const {id} = this.props.match.params;
    tupperService.editTupper(tupper, id)
    .then((result) => {
      console.log(result);
      this.props.history.push(`/tuppers/${id}`);
    })
    .catch(err => console.log(err));
  }

  render() {
    const {isLoading} = this.state;
    return (
      (isLoading) ? <p>Loading...</p> : 
        <div>
          <EditForm onSubmit={this.handleSubmit} value={this.state.tupper}/>
        </div>
    )
  }
}

export default EditTupper;

