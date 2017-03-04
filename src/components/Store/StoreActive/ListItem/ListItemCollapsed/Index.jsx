import React from 'react';
import Address from './Address';
import Minutes from './Minutes';
import ToggleButton from './ToggleButton';

const ListItemCollapsed = ({ order }) => {
  return (
    <section style={collapsedStyle}>
      <ToggleButton orderId={order.orderId} />
      <span>ID: {order.orderId}</span>
      <Address address={order.customerAddress} unit={order.customerUnit} />
      <Minutes createdAt={order.orderCreatedAt} readyIn={order.orderReadyIn} />
    </section>
  );
};

const collapsedStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
  height: '50px',
};


ListItemCollapsed.propTypes = {
  order: React.PropTypes.object.isRequired,
}

export default ListItemCollapsed;
