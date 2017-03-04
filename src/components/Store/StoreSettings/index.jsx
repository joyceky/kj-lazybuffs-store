import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { logout } from '../../../actions';

class StoreSettings extends Component {
  render(){
    return <section style={style.container}>
      <ul style={style.list}>
        {/* <li style={style.listItem}>
          <button
          style={style.logoutButton}
          >
          SIGNUP AN ACCOUNT
          </button>

        </li> */}
        <li>
          <button
          onClick={this.props.logout}
          style={style.logoutButton}
          >
          LOGOUT
          </button>
        </li>
      </ul>
    </section>
  }
}

const style = {
  container: {
    position: 'fixed',
    top: '50px',
    left: '0',
    width: '100%',
    height: 'calc(100% - 50px)',
    overflow: 'scroll',
    padding: '16px',
  },
  list: {
    listStyle: 'none',
    margin: '0',
    padding: '0',
  },
  listItem: {
    margin: '0',
    padding: '8px 0',
  },
  logoutButton: {
    color: '#FFB300',
    fontSize: '16px',
  },
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({ logout }, dispatch);
}

export default connect(null, mapDispatchToProps)(StoreSettings);
