import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TransactionDone extends Component {

  render() {
    const { id } = this.props.match.params;
    console.log(this.props.match) 
    return (
      <div className="transaction-page">
        <img src="./img/done.png" alt="."/>
        <p>Good choise!</p>
        <p>After tasting the food, <br/> please rate the chef</p>
        <Link to={`/tuppers/${id}`}><p>Rate it now!</p></Link>
      </div>
    );
  }
}

export default TransactionDone;