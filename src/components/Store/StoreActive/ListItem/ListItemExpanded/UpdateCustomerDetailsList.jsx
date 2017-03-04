import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveUpdatedCustomer } from '../../../../../actions';
import MaterialInput from './MaterialInput';

const stylePhone = (num) => `${num.slice(0,3)}-${num.slice(3,6)}-${num.slice(6,10)}`;


class UpdateCustomerDetailsList extends Component {
  constructor(props){
    super(props);
    this.state = {
      customerId: this.props.order.customerId,
      customerName: this.props.order.customerName,
      customerPhone: stylePhone(this.props.order.customerPhone),
      customerAddress: this.props.order.customerAddress,
      customerUnit: this.props.order.customerUnit,
      customerZip: this.props.order.customerZip,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);

  }
  handleNameChange(e){
    this.setState({ customerName: e.target.value });
  }
  handlePhoneChange(e){
    this.setState({ customerPhone: e.target.value });
  }
  handleAddressChange(e){
    this.setState({ customerAddress: e.target.value });
  }
  handleUnitChange(e){
    this.setState({ customerUnit: e.target.value });
  }
  handleZipChange(e){
    this.setState({ customerZip: e.target.value });
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.saveUpdatedOrderId === this.props.order.orderId) {
      this.props.saveUpdatedCustomer(this.state, this.props.auth);
    }
  }
  render(){
    const order = this.props.order;
    return (
      <ul style={style.list}>
        <li style={style.listItem}>
          <MaterialInput label='Customer Name' onChange={this.handleNameChange} value={this.state.customerName} />
        </li>
        <li style={style.listItem}>
          <MaterialInput label='Customer Phone' onChange={this.handlePhoneChange} value={this.state.customerPhone} />
        </li>
        <li style={style.listItem}>
          <MaterialInput label='Customer Address' onChange={this.handleAddressChange} value={this.state.customerAddress} />
        </li>
        <li style={style.listItem}>
          <MaterialInput label='Customer Unit' onChange={this.handleUnitChange} value={this.state.customerUnit} />
        </li>
        <li style={style.listItem}>
          <MaterialInput label='Customer Zip' onChange={this.handleZipChange} value={this.state.customerZip} />
        </li>
      </ul>
    );
  }
};

const style = {
  list: {
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    margin: '0',
    padding: '0',
    width: '100%',
  },
  storeName: {
    fontSize: '20px',
  },
  totals: {
    fontSize: '16px',
  },
  listItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};



function mapStateToProps({ auth, saveUpdatedOrderId }) {
  return { auth, saveUpdatedOrderId };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveUpdatedCustomer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCustomerDetailsList);
