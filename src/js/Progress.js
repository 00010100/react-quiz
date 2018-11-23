import React from 'react';
import PropTypes from 'prop-types';

const Progress = ({ progress, total }) => {
  const totalPercentage = progress > 0 ? 100 / (total / progress) : 0;

  return (
    <div className="progress-container">
      <div className="progress-label">
        {`${progress} of ${total} answered`}
      </div>
      <div className="progress">
        <div className="progress-bar" style={{ width: `${totalPercentage}%` }}>
          <span className="sr-only">${totalPercentage} Complete</span>
        </div>
      </div>
    </div>
  );
};

Progress.propTypes = {
  progress: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default Progress;
