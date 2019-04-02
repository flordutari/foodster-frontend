import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import successLogo from '../img/verified.svg';

class TransactionDone extends Component {

  render() {
    const { id } = this.props.match.params;
    return (
      <div className="transaction-page">
        <img src={successLogo} alt="."/>
        <p className="red">Good choise!</p>
        <p>After tasting the food, <br/> please rate the chef</p>
        <Link id="rate-link"  to={`/tuppers/${id}`}><p>Rate it now!</p></Link>
      </div>
    );
  }
}

export default TransactionDone;