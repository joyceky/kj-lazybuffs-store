import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteOrder, getUser, getStoreActiveOrders, getStoreCompletedOrders, getStoreCompletedOrdersSortBy } from '../../actions';
import StoreNav from './StoreNav';

class Store extends Component {

  componentDidMount() {
    if (!this.props.auth) return browserHistory.push('/login');
    if (this.props.auth) {
      if (this.props.auth.userType !== 'store') {
        return browserHistory.push('/login');
      }

    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth) browserHistory.push('/login');
  }


  render() {
    if (this.props.loading === 'STORE_ORDERS') return <p>Loading...</p>;
    return (
      <main>
        <StoreNav />
        {this.props.children}
        {this.props.confirmation ? <ConfirmationModal /> : null}
      </main>
    );
  }
}

function mapStateToProps({ auth, loading, confirmation }){
  return { auth, loading, confirmation };
}

export default connect(mapStateToProps, null)(Store);
