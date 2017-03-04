import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { setActiveStoreView } from '../../actions';

const NavIcon = ({ iconName, style, linkLocation }) => {
  return (
      <Link
        to={linkLocation}
        style={style.link}
        activeStyle={style.linkActive}
      >
        <i className="material-icons" style={style.buttonIcon}>{iconName}</i>
      </Link>
  )
};

class StoreNav extends Component {
  render() {
    return (
      <nav style={navStyle}>
        <NavIcon
          iconName='add'
          linkLocation='new'
          style={iconStyle}
        />
        <NavIcon
          iconName='list'
          linkLocation='active'
          style={iconStyle}
        />
        <NavIcon
          iconName='show_chart'
          linkLocation='analytics'
          style={iconStyle}
        />
        <NavIcon
          iconName='settings'
          linkLocation='settings'
          style={iconStyle}
        />
      </nav>
    );
  }
}

const navStyle = {
  position: 'fixed',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  background: '#292929',
  width: '100vw',
  height: '50px',
  zIndex: '10',
  top: '0',
  left: '0',
}

const iconStyle = {
  link: {
    height: '50px',
    width: '25%',
    outline: 'none',
    color: 'rgba(255,255,255,0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
  },
  linkActive: {
    color: '#FFB300',
  },
  buttonIcon: {
    fontSize: '36px',
  },
};

StoreNav.defaultProps = {
};

function mapStateToProps({ auth, activeStoreView }) {
  return { auth, activeStoreView };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setActiveStoreView }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreNav);
