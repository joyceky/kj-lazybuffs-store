import React from 'react';

const msToMins = (ms) => (Math.floor(ms / 60000));

const Minutes = ({ createdAt, completedAt }) => {
  return(
    <p style={minutesStyle}>
      {`${msToMins(completedAt - createdAt) + 1} min`}
    </p>
  );
}

const minutesStyle = {
  fontSize: '1em',
  margin: '0',
  padding: '0',
};

Minutes.propTypes = {
  createdAt: React.PropTypes.string.isRequired,
}

export default Minutes;
