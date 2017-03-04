import React from 'react';
import ButtonPanel from './ButtonPanel';

const Header = ({ order }) => {
  return (
    <section style={headerStyle}>
      <h1 style={subTitleStyle}>Customer</h1>
      <ButtonPanel order={order} />
    </section>
  );
};

const headerStyle = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const subTitleStyle = {
  margin: '0',
  padding: '0',
  fontSize: '16px',
};

Header.propTypes = {
  order: React.PropTypes.object.isRequired,
}

export default Header;
