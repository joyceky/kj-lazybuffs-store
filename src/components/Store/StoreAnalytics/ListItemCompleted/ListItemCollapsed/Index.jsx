import React from 'react';
import Address from './Address';
import Minutes from './Minutes';
import ToggleButton from './ToggleButton';

const ListItemCollapsed = ({ order }) => {
  return (
    <section style={collapsedStyle}>
      <ToggleButton orderId={order.orderId} />
      <Address address={order.customerAddress} unit={order.customerUnit} />
      <Minutes completedAt={order.orderCompletedAt} createdAt={order.orderCreatedAt} />
      <span style={nameStyle}>{`ID ${order.orderId}`}</span>
    </section>
  );
};

const nameStyle = {
  marginRight: '16px',
}

const collapsedStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height:'50px',
  width: '100%',
};

// const storeAddressStyle = {
//   height: '50px',
//   display: 'flex',
//   flexDirection: 'column',
//   paddingRight: '20px',
// };

ListItemCollapsed.propTypes = {
  order: React.PropTypes.object.isRequired,
}

export default ListItemCollapsed;
