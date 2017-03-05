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
      day: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
    }
    this.selectDay = this.selectDay.bind(this);
    this.selectMonth = this.selectMonth.bind(this);
    this.selectYear = this.selectYear.bind(this);
  }

  componentDidMount(){
    this.props.getStoreCompletedOrders(this.props.auth);
  }

  selectDay(e){
    this.setState({ day: parseInt(e.target.value) });
  }
  selectMonth(e){
    this.setState({ month: parseInt(e.target.value) });
  }
  selectYear(e){
    this.setState({ year: parseInt(e.target.value) });
  }

  filterByDate(){
      return this.props.storeCompletedOrders
      .filter(e => {
        var orderDate = new Date(parseInt(e.orderCreatedAt));
        if ( orderDate.getDate() === this.state.day && orderDate.getMonth() === this.state.month) {
          return true;
        }
      })
  }
  calcRevenue(orders){
      return orders
      .reduce((prev, curr) => {
        return prev + parseFloat(curr.orderSubTotal);
      }, 0).toFixed(2);
  }

  render(){
    var x = (e) => {
      return e.orderId;
      var orderDate = new Date(parseInt(e.orderCreatedAt));
      return parseInt(orderDate.getDate());
    };

    return (
      <section style={style.container}>
      <section style={style.previewBanner}>
        ANALYTICS BETA
      </section>
        <section style={style.header}>
          <section>
            <select onChange={this.selectMonth} value={this.state.month}>
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            .map((monthVal, i) => {
              return <option value={i}>{monthVal}</option>
            })}
            </select>
            <select onChange={this.selectDay} value={this.state.day}>
            {
              [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
              .map((i) => {
                return <option value={i}>{i}</option>
              })
            }
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

          <section>
          {
            `Store Revenue ${this.calcRevenue(this.filterByDate(this.props.storeCompletedOrders))}`
          }
          </section>
        </section>


          <section style={style.chartContainer}>
          {/* {this.filterByDate(this.props.storeCompletedOrders).length > 0
          ?  <BarChart
            showXGrid= {true}
            showYGrid= {true}
            title={'Test'}
            width={600}
            height={450}
            x={x}
            xLabel={'Order ID: '}
            xScale={'ordinal'}
            data={this.filterByDate(this.props.storeCompletedOrders)}
            chartSeries={
              [
                {
                  field: 'orderSubTotal',
                  name: 'Sub Total',
                },
              ]
            }
            />
          : <h1 style={style.noOrdersTitle}>No Orders for {`${this.state.month + 1}/${this.state.day}/${this.state.year}`}</h1>} */}
          </section>
        <ul style={style.listStyle}>
          {this.filterByDate(this.props.storeCompletedOrders).map((order) => {
            return  <ListItemCompleted order={order} key={order.orderId} />
          })}
        </ul>
      </section>
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
