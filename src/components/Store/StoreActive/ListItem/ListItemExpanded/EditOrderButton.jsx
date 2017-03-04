import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleOrderUpdate } from '../../../../../actions';

const EditOrderButton = ({ toggleOrderUpdate, order }) => {
  return (
    <button
      onClick={() => toggleOrderUpdate(order.orderId)}
      style={buttonStyle}
    >
      <i
        style={iconStyle}
        className="material-icons"
      >
      mode_edit
      </i>
    </button>
  );
}
const buttonStyle = {
  width: '50px',
  backgroundColor: '#448AFF',
  color: 'white',
  borderRadius: '4px',
};

const iconStyle = {
  fontSize: '24px',
};

// function mapStateToProps({ activeListItem }) {
//   return { activeListItem };
// }
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleOrderUpdate }, dispatch);
}

export default connect(null, mapDispatchToProps)(EditOrderButton);
