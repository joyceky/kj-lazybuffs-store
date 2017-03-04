import React, { Component } from 'react';
import EditOrderButton from './EditOrderButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveUpdatedOrder } from '../../../../../actions';

const SaveButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={saveButtonStyle}
    >
      <i
        style={saveIconStyle}
        className="material-icons"
      >
      save
      </i>
    </button>
  );
}

const saveButtonStyle = {
  width: '50px',
  backgroundColor: '#009688',
  marginRight: '16px',
  color: 'white',
  borderRadius: '4px',
};

const saveIconStyle = {
  fontSize: '24px',
};

const ButtonPanel = ({ order, activeOrderUpdateId, saveUpdatedOrder }) => {
    return (
      <section>
        {activeOrderUpdateId === order.orderId
        ? <SaveButton onClick={() => saveUpdatedOrder(this.props.order.orderId)}/>
        : null}
        <EditOrderButton order={order} />
      </section>
    );
};



ButtonPanel.propTypes = {
  order: React.PropTypes.object.isRequired,
}

function mapStateToProps({ activeOrderUpdateId }) {
  return { activeOrderUpdateId };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ saveUpdatedOrder }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonPanel);
