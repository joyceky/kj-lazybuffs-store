import React, { Component } from 'react';
import axios from 'axios';
import { API_URL, stylePhone } from '../../../../../actions';


class Delivery extends Component {
  driverRow(order){
    return (
      <article style={style.row}>
        <span>Driver</span>
        <span>{`${order.driverName} ${stylePhone(order.driverPhone)}`}</span>
      </article>
    );
  }

  render(){
    return (
      <section style={style.container}>
        <h1 style={style.title}>Delivery</h1>
        <article style={style.row}>
          <span style={style.rowTitle}>Order Status</span>
          <span style={style.rowData}>{this.props.order.orderStatus.toUpperCase()}</span>
        </article>

        {this.props.order.orderStatus !== 'unassigned'
        ? this.driverRow(this.props.order) : null}

      </section>
    );
  }
}

const style = {
  container: {
  },
  title: {
    margin: '16px 0 8px 0',
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

export default Delivery;
