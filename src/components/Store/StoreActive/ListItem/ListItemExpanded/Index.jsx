import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import OrderDetailsList from './OrderDetailsList';
import CustomerDetailsList from './CustomerDetailsList';
import Delivery from './Delivery';

const stylePhone = (num) => `${num.slice(0,3)}-${num.slice(3,6)}-${num.slice(6,10)}`;

const ListItemExpanded = ({ order }) => {
  return (
    <section style={container}>
      <Header order={order} />
      <CustomerDetailsList order={order} />


      <h1 style={title}>Order</h1>
      <OrderDetailsList order={order} />

      {order.orderNote ? <h1 style={title}>Order Note</h1> : null}
      <span style={orderNotes}>{order.orderNote}</span>

      <Delivery order={order} />
    </section>
  );
}

const title = {
  fontSize: '16px',
  margin: '16px 0 8px 0',
  padding: '0',
};

const storeName = {
  fontSize: '16px',
  margin: '0',
  padding: '0',
  paddingBottom: '8px',
};

const container = {
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  backgroundColor: '#ECEFF1',
};

const orderNotes = {
  width: '100%',
};

export default ListItemExpanded;
