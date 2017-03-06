import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getStoreCompletedOrders } from '../../../actions';
import ListItemCompleted from './ListItemCompleted';
import BarChartComponent from './Graphs/BarChart';
import axios from 'axios';
import { API_URL } from '../../../actions';

class StoreAnalytics extends Component {
  constructor(){
    super();
    const today = new Date();

    this.state = {
      month: (today.getMonth() - 1),
      year: today.getFullYear(),
      orders: []
    }

    this.selectMonth = this.selectMonth.bind(this);
    this.selectYear = this.selectYear.bind(this);
    this.getOrderData = this.getOrderData.bind(this);
  }

  componentDidMount(){
    this.getOrderData(this.state.month, this.state.year);
  }

  getOrderData(month, year) {
    axios.post(`${API_URL}/store/orders/analytics`, { auth: this.props.auth, month: month, year: year })
      .then(({ data }) => {
        console.log("Url ", `${API_URL}/store/orders/analytics`);
        console.log("Auth ", this.props.auth);
        console.log("Month ", month, "Year ", year);
        console.log("Data ", data);

        this.setState({ orders: data });
      })
      .catch((err) => {
        console.log("Error: ", err);
      })
  }

  selectMonth(e){
    this.setState({ month: parseInt(e.target.value) });
    console.log("etarget", e.target.value);
    this.getOrderData(e.target.value, this.state.year)
  }
  selectYear(e){
    this.setState({ year: parseInt(e.target.value) });
    this.getOrderData(this.state.month, e.target.value);
  }

  formatData(orders) {
    const daysNum = new Date(this.state.year, this.state.month, 0).getDate();
    const days = [];

    for (var i = 1; i <= daysNum; i++) { days.push(i) };

    const cleanData = days.map((day) => {
      const daysOrders = orders.filter((order) => {
        if ( new Date(parseInt(order.orderCreatedAt)).getDate() === day) return true;
      });
      const total = daysOrders.reduce((curr, nextOrder) => {
         return curr + parseFloat(nextOrder.orderSubTotal) ;
      }, 0);

      return { date: day, total, orders: daysOrders.length };
    });

    return cleanData;
  }

  calcRevenue(orders){
      return orders
      .reduce((prev, curr) => {
        return prev + parseFloat(curr.orderSubTotal);
      }, 0).toFixed(2);
  }

  render(){
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
      <div>
      <section style={style.container}>
      <section style={style.previewBanner}>
        ANALYTICS BETA
      </section>
        <section style={style.header}>
          <section>
            <select onChange={this.selectMonth} value={this.state.month}>
                {months.map((monthVal, i) => {
              return <option value={i}>{monthVal}</option>
            })}
            </select>
            <select onChange={this.selectYear} value={this.state.year}>
            {
              [2014,2015,2016,2017]
              .map((year) => {
                return <option value={year}>{year}</option>
              })
            }
            </select>
          </section>
        </section>


          <section style={style.chartContainer}>
          {this.state.orders.length > 0
          ?
          <div>
            <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="orders" color="#7830ee" />
            <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="total" color="#29cb56" />
          </div>

          : <h1 style={style.noOrdersTitle}>No Orders for {`${months[this.state.month]} ${this.state.year}`}</h1>}
        </section>

        <section>
          {
            `Store Revenue for ${months[this.state.month]} ${this.state.year}: $${ this.calcRevenue(this.state.orders)}`
          }
        </section>

        <ul style={style.listStyle}>
          {this.state.orders.map((order) => {
            return  <ListItemCompleted order={order} key={order.orderId} />
          })}
        </ul>
      </section>
      </div>
    );
  }
}

const style = {
  container: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  header: {
    padding: '16px',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 'auto',
    width: 'auto',
  },
  listStyle: {
    listStyle: 'none',
    margin: '0',
    width: '100%',
    padding: '0',
  },
  listSortBy: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: '8px',
  },
  listSortByButton: {},
  allOrdersTitle: {
    margin: '0',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '2px solid lightgrey',
  },
  noOrdersTitle: {
    fontSize: '20px',
    margin: '0',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewBanner: {
    top: '50px',
    left: '0',
    width: '100%',
    fontSize: '24px',
    padding: '8px',
    backgroundColor: '#414141',
    textAlign: 'center',
    color: '#FFB300',
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getStoreCompletedOrders }, dispatch);
}
function mapStateToProps({ auth, storeCompletedOrders }) {
  return { auth, storeCompletedOrders };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreAnalytics);
