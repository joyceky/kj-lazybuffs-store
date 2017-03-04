import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getStoreActiveOrders } from '../../../actions'
import ListItem from './ListItem';

class OrdersList extends Component {
  componentDidMount(){
    if (this.props.auth) {
      this.props.getStoreActiveOrders(this.props.auth);
    }
  }

  mapListItems(orders) {
    return orders.map(order => <ListItem order={order} key={order.orderId} />);
  }

  render() {
    return (
      <section style={style.container}>

        <ul style={listStyle}>
          {this.props.storeActiveOrders.length === 0
            ? <li style={style.title}>No Active Orders</li>
            : null}
          {this.mapListItems(this.props.storeActiveOrders)}
        </ul>
      </section>
    );
  }
}

const style = {
  container: {
    position: 'fixed',
    top: '50px',
    left: '0px',
    display: 'flex',
    width: '100%',
    height: 'calc(100% - 50px)',
    overflow: 'scroll',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    padding: '16px',
  },
};

const listStyle = {
  listStyle: 'none',
  margin: '0',
  width: '100%',
  padding: '0',
};

function mapStateToProps({ auth, storeActiveOrders }) {
  return { auth, storeActiveOrders };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getStoreActiveOrders }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersList);
