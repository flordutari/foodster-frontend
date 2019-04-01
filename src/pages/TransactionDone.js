import React, { Component } from 'react';

class TransactionDone extends Component {

  render() {
    
    return (
      <div className="transaction-page">
        <img src="./img/done.png" alt="."/>
        <p>Good choise!</p>
        <p>After tasting the food, <br/> please rate the chef</p>
      </div>
    );
  }
}

export default TransactionDone;