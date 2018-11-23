import React from 'react';
import PropTypes from 'prop-types';
import Answers from './Answers';

const Results = ({
  allAnswers,
  allQuestions,
  correctAnswers,
  loadNewQuestion,
  onLoadResults,
  resultsLoaded,
  onRestart,
}) => {
  let numberOfCorrect = 0;
  correctAnswers &&
    allQuestions.map((question, index) => {
      correctAnswers[index] === allAnswers[index] && numberOfCorrect++;
    });

  return (
    <div className={`results fade-out ${loadNewQuestion && 'fade-out-active'}`}>
      <div className="loader">
        <div className="icon" />
      </div>
      <div className="results-overlay" />
      <h1>{`${
        resultsLoaded ? `${numberOfCorrect} out of ${allAnswers.length} correct!` : 'Here are your answers:'
      }`}</h1>

      <div className="answers">
        <Answers
          allAnswers={allAnswers}
          allQuestions={allQuestions}
          correctAnswers={correctAnswers}
        />
      </div>

      <div className="text-center">
        {resultsLoaded ? (
          <button className="btn btn-dark" onClick={onRestart}>
            Start again
          </button>
        ) : (
          <button className="btn btn-dark" onClick={onLoadResults}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

Results.propTypes = {
  allAnswers: PropTypes.array.isRequired,
  allQuestions: PropTypes.array.isRequired,
  correctAnswers: PropTypes.array,
  loadNewQuestion: PropTypes.bool.isRequired,
  onLoadResults: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
  resultsLoaded: PropTypes.bool.isRequired,
};

export default Results;
