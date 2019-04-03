import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import TalkCard from '../components/TalkCard';
import talksService from '../lib/talks-service';

class TalksList extends Component {

  state ={
    talks: [],
  }

  componentDidMount = () => {
    this.getTalksList();
  }

  getTalksList = () => {
    talksService.getAllMines()
    .then(talks => {
      this.getOtherUser(talks)
    })
    .catch(err => console.log(err));
  }

  getOtherUser = (talks) => {
    const { _id } = this.props.user;
    talks.forEach((talk, index) => {
      if(talk.guest === _id){
        talks[index].otherId = talk.opener
      }else{
        talks[index].otherId = talk.guest
      }
    })
    this.setState({
      talks,
    })  
  }

  render() {
    const { talks } = this.state;
    return (
      <div className="all-talks-page">
        {talks.map(talk =>
          <TalkCard 
          talk={talk}
          />
        )}
      </div>
    );
  }
}

export default withAuth(TalksList);