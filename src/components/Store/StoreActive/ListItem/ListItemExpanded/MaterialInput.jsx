import React, { Component } from 'react';

export default class MaterialInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      focus: false,
      touched: false,
    };
    this.inputFocus = this.inputFocus.bind(this);
    this.inputBlur = this.inputBlur.bind(this);
  }

  componentDidMount(){
    if (typeof this.props.value === 'number') this.setState({ touched: true });
  }

  inputFocus(e){
    this.setState({
      focus: true,
      touched: true,
    });
  }

  inputBlur(e){
    this.setState({
      focus: false,
    });
    if (e.target.value.length === 0) {
      this.setState({ touched: false });
    }
  }

  render() {
    let labelStyle = null;
    if (this.state.focus) {
      labelStyle = style.labelFocus;
    }
    else {
      labelStyle = style.label;
    }
    return (
      <section>
        <label style={labelStyle}>
        {this.props.label}
        <br />
          <input
          onChange={this.props.onChange}
          onFocus={this.inputFocus}
          onBlur={this.inputBlur}
          onAbort={(e) => console.log(e)}
          placeholder={this.state.focus ? '' : this.props.label}
          style={this.state.focus ? style.inputFocus : style.input}
          value={this.props.value}
          type={this.props.type ? this.props.type : 'text'}
          />
        </label>
      </section>
    );
  }
}

const style = {
  placeholder: {
    fontSize: '10px',
    color: '#ECEFF1',
  },
  label: {
    width: '100%',
    fontSize: '10px',
  },
  labelFocus: {
    width: '100%',
    fontSize: '10px',
    color: '#FFB300',
  },
  input: {
    margin: 'auto',
    padding: '4px 0',
    fontSize: '16px',
    width: '100%',
    background: '#ECEFF1',
    color: 'rgba(0,0,0,0.7)',
    outline: 'none',
    border: '0',
    borderBottom: '1px solid rgba(0,0,0,0.3)',
  },
  inputFocus: {
    margin: 'auto',
    padding: '4px 0',
    fontSize: '16px',
    width: '100%',
    background: '#ECEFF1',
    color: 'rgba(0,0,0,0.7)',
    outline: 'none',
    border: '0',
    borderBottom: '1px solid #FFB300',
  },
};
