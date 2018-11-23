import React from 'react';
import PropTypes from 'prop-types';

const arrowRightImg =
  'https://ihatetomatoes.net/react-tutorials/abc-quiz/fonts/navigation-right-arrow.svg';
const arrowLeftImg =
  'https://ihatetomatoes.net/react-tutorials/abc-quiz/fonts/navigation-left-arrow.svg';

const Arrow = ({
  direction,
  progress,
  allAnswers,
  goToNextQuestion,
  goToPreviousQuestion,
  showResults,
}) => {
  const image = direction === 'left' ? arrowLeftImg : arrowRightImg;
  const isDisabled =
    (direction === 'left' && progress === 0) ||
    (direction === 'right' && !allAnswers[progress]) ||
    (direction === 'right' && showResults);

  return (
    <button
      disabled={isDisabled}
      className={`arrow ${isDisabled && 'is-disabled'}`}
      onClick={direction === 'left' ? goToPreviousQuestion : goToNextQuestion}
    >
      <img src={image} />
    </button>
  );
};

Arrow.propTypes = {
  direction: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  allAnswers: PropTypes.array.isRequired,
  goToPreviousQuestion: PropTypes.func,
  goToNextQuestion: PropTypes.func,
  showResults: PropTypes.bool.isRequired,
};

export default Arrow;
