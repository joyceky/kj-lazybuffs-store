import React, { Component } from 'react';
import { login, logout } from '../../actions';
import { bindActionCreators } from 'redux';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import MaterialInput from './MaterialInput';
import Loader from './Loader';

class LoginForm extends Component {
  constructor(){
    super();
    this.state = {
      err: null,
      email: '',
      password: '',
    };
    this.submitLogin = this.submitLogin.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      if (nextProps.auth.userStoreId) browserHistory.push('/');
    }
  }

  emailChange(e) {
    this.setState({ email: e.target.value });
  }

  passwordChange(e) {
    this.setState({ password: e.target.value });
  }

  submitLogin(e) {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }

  render() {
    const Nav = (
      <nav style={style.nav}>
        <img
          style={style.logo}
          src='https://s3-us-west-2.amazonaws.com/lazybuffs.com/images/lazybuffs_logo_long.png'
        />
      </nav>
    );

    const title = this.props.auth
    ? <span style={style.title}>
        {`Signed in with ${this.props.auth.userEmail} `}
      </span>
    : null;

    const ErrMsg = this.props.errors
      ? <p style={style.err}>{this.props.errors}</p>
      : null;

    return (
      <form style={style.form} onSubmit={this.state.signup ? this.submitSignup : this.submitLogin}>
        {Nav}
        {title}
        <section style={style.inputSection}>
          <MaterialInput label='Username' onChange={this.emailChange} value={this.state.email} />
          <MaterialInput label='Password' type='password' onChange={this.passwordChange} value={this.state.password} />
          {ErrMsg}
        </section>

        <section style={style.inputSection}>
          <button type='submit' style={style.button}>
            {this.props.loading ? 'loading...' : 'Submit'}
          </button>
        </section>
      </form>
    );
  }
}

const style = {
  form: {
    top: '0',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#000000',
    boxSizing: 'border-box',
    width: '100vw',
    height: '100vh',
    padding: '0 16px',
  },
  nav: {
    width: '100%',
    height: 'auto',
    margin: '0',
    padding: '0',
    padding: '16px',
    backgroundColor: '#CFB87C',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '20px',
    color: 'white',
  },
  inputSection: {
    width: '100%',
    maxWidth: '540px',
    display: 'flex',
    color: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  button: {
    backgroundColor: '#CFB87C',
    padding: '8px',
    fontSize: '1.25em',
    width: '100%',
    maxWidth: '540px',
    border: '0',
    borderRadius: '.25em',
    outline: 'none',
    boxShadow: '0 3px 6px rgba(0,0,0,0.23)'
  },
  logout: {
    borderBottom: '1px solid #CFB87C',
  },
  signupLink: {
    borderBottom: '1px solid #CFB87C',
  },
  signupText: {
    color: 'white',
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  err: {
    margin: '0',
    color: '#F44336',
  },
  actSelectLabel: {
    color: 'white',
  },
  actSelect: {
    marginTop: '16px',
  },
  logo: {
    maxWidth: '100%',
  },
}

function mapStateToProps({ errors, auth, loading }) {
  return { errors, auth, loading };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login, logout }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
