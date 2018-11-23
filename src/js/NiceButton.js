import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NiceButton extends Component {
  static propTypes = {
    choice: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onSelectAnswer: PropTypes.func.isRequired,
    allAnswers: PropTypes.array.isRequired,
  };

  get selected() {
    const { allAnswers, choice } = this.props;

    return allAnswers.includes(choice);
  };

  getLetter = (index) => {
    const letters = ['A', 'B', 'C'];

    return letters[index];
  };

  handleClick = () => {
    const { choice, onSelectAnswer } = this.props;

    this.btn.classList.add('is-selected', 'is-highlighted');

    setTimeout(() => {
      onSelectAnswer(choice);
    }, 500);
  };

  render() {
    const { choice, index, onSelectAnswer } = this.props;

    return (
      <button
        className={`btn btn-huge ${this.selected && 'is-selected'}`}
        ref={(btn) => {
          this.btn = btn;
        }}
        onClick={this.handleClick}
      >
        <span className="letter">{this.getLetter(index)}</span>
        {choice}
      </button>
    );
  }
}
