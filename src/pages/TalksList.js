import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import TalkCard from '../components/TalkCard';

class TalksList extends Component {
  render() {
    return (
      <div className="talk-page">
        <TalkCard />
        <TalkCard />
        <TalkCard />
        <TalkCard />
        <TalkCard />
      </div>
    );
  }
}

export default withAuth(TalksList);