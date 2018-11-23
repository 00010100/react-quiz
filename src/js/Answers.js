import React from 'react';
import PropTypes from 'prop-types';

const Answers = ({ allAnswers, allQuestions, correctAnswers }) => {
  return (
    <ol>
      {allQuestions.map(({ question, _id, index }) => {
        const isCorrect = correctAnswers && correctAnswers[index] === allAnswers[index];

        return (
          <li key={_id} className={`${isCorrect ? 'text-success' : 'text-danger'}`}>
            {question} <br />
            <strong>{allAnswers[index]}</strong> <br />
            {correctAnswers && !isCorrect && (
              <span className="correct-answer"> {correctAnswers[index]}</span>
            )}
          </li>
        );
      })}
    </ol>
  );
};

Answers.propTypes = {
  allAnswers: PropTypes.array.isRequired,
  allQuestions: PropTypes.array.isRequired,
  correctAnswers: PropTypes.array,
};

export default Answers;
