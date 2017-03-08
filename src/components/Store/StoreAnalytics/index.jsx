import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getStoreCompletedOrders } from '../../../actions';
import ListItemCompleted from './ListItemCompleted';
import BarChartComponent from './Analytics//BarChart';
import axios from 'axios';
import { API_URL } from '../../../actions';

class StoreAnalytics extends Component {
  constructor(){
    super();

    const today = new Date();

    this.state = {
      month: today.getMonth(),
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
        this.setState({ month, year, orders: data});
      })
      .catch((err) => {
        console.log("Error: ", err);
      })
  }

  selectMonth(e){

    this.getOrderData(e.target.value, this.state.year)
  }

  selectYear(e){
    this.getOrderData(this.state.month, e.target.value);
  }

  formatData(orders) {
    let month = parseInt(this.state.month)+1;
    const daysNum = new Date(this.state.year, month, 0).getDate();
    const days = [];

    for (var i = 1; i <= daysNum; i++) { days.push(i) };

    const cleanData = days.map((day) => {
      const daysOrders = orders.filter((order) => {
        if ( new Date(parseInt(order.orderCreatedAt) + 420).getDate() === day) return true;
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

           <section style={style.header}>
             <section style={style.buttonContainer}>
               <section  style={style.buttonContainerDropdowns}>

                 <select style={style.select} onChange={this.selectMonth} value={this.state.month}>
                   {
                      months.map((monthVal, i) => {
                        return <option value={i} key={i}>{monthVal}</option>
                      })
                    }
                  </select>

                  <select style={style.select} onChange={this.selectYear} value={this.state.year}>
                    {
                      [2014,2015,2016,2017]
                      .map((year, i) => {
                        return <option key={i} value={year}>{year}</option>
                      })
                    }
                  </select>
                </section>

                  <button className='generate-invoice-button' style={style.btn} onClick={() => this.toggleInvoice()}>Generate Invoice</button>
              </section>

              <section>
                <p>{`Orders: ${ this.state.orders.length }`}</p>
                <p>{`Revenue: $${ (this.calcRevenue(this.state.orders)) }`}</p>
              </section>
            </section>

          { this.state.loading ?
              <span style={style.subContainer}>
                <h1 style={style.title}>Loading analytics...</h1>
              </span>
              : null }

          { !this.state.loading && this.state.orders.length > 0
          ?
          <div>
            <section style={style.chartContainer}>
              <div style={{zIndex: '0'}}>
                <p>Orders Analytics</p>
                <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="orders" color="#CFB87C" />

                <p>Revenue Analytics</p>
                <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="total" color="#A2A4A3" />
              </div>
            </section>
          </div>
          : <h1 style={style.noOrdersTitle}>No Orders for {`${months[this.state.month]} ${this.state.year}`}</h1>}

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
    width: '100%'
  },
  subContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btn: {
    borderRadius: '5px',
    display: 'block',
    padding: '8px 10px',
    fontSize: '22px',
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: 'black',
    boxShadow: '0px 5px 0px 0px #565A5C',
    fontSize: '18px'
  },
  title: {
    fontSize: '20px',
    margin: '16px',
    padding: '0',
  },
  select: {
    height: '35px',
    fontSize: '18px',
    margin: '8px',
    backgroundColor: '#fff',
    color: "#565A5C"
  },
  header: {
    padding: '64px',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '18px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainerDropdown: {

  },
  chartContainer: {
    maxWidth: '100%',
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 'auto',
    width: 'auto',
    fontSize: '20px',
    textAlign: 'center'
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
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getStoreCompletedOrders }, dispatch);
}
function mapStateToProps({ auth, storeCompletedOrders }) {
  return { auth, storeCompletedOrders };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreAnalytics);
