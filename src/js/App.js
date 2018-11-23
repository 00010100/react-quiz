import React from 'react';
import data from './data/Data';
import Question from './Question';
import Results from './Results';
import Progress from './Progress';
import Arrow from './Arrow';

import defaultImage from '../images/truck.svg';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allQuestions: data.allQuestions,
      currentQuestion: data.allQuestions[0],
      progress: 0,
      allAnswers: [],
      loadNewQuestion: false,
      showResults: false,
      loadingResults: false,
      correctAnswers: null,
      resultsLoaded: false,
    };
  }

  onSelectAnswer = (answer) => {
    const { allAnswers, progress } = this.state;

    const currentAnswer = allAnswers[progress];

    if (currentAnswer) {
      allAnswers[progress] = answer;

      this.setState({ allAnswers }, this.goToNextQuestion());
    } else {
      this.setState(
        {
          allAnswers: [...allAnswers, answer],
        },
        this.goToNextQuestion()
      );
    }
  };

  goToNextQuestion = () => {
    const { progress, allQuestions } = this.state;

    this.setState({ loadNewQuestion: true });

    setTimeout(() => {
      if (progress < allQuestions.length - 1) {
        this.setState({
          progress: progress + 1,
          currentQuestion: allQuestions[progress + 1],
          loadNewQuestion: false,
        });
      } else {
        this.setState({
          loadNewQuestion: false,
          showResults: true,
        });
      }
    }, 300);
  };

  goToPreviousQuestion = () => {
    const { progress, allQuestions, showResults } = this.state;

    this.setState({ loadNewQuestion: true });

    setTimeout(() => {
      progress > 0 &&
        !showResults &&
        this.setState({
          progress: progress - 1,
          loadNewQuestion: false,
          currentQuestion: allQuestions[progress - 1],
        });

      showResults &&
        this.setState({
          showResults: false,
          loadNewQuestion: false,
        });
    }, 300);
  };

  onLoadResults = () => {
    this.setState({ loadingResults: true });

    fetch('https://api.myjson.com/bins/zgpjb')
      .then((response) => response.json())
      .then((parsedJSON) => {
        this.setState({
          correctAnswers: parsedJSON.correctAnswers,
          loadingResults: false,
          resultsLoaded: true,
        });
      })
      .catch((err) => {
        this.setState({
          loadingResults: false,
          resultsLoaded: true,
        });
      });

    setTimeout(() => {
      this.setState({ loadingResults: false });
    }, 1000);
  };

  onRestart = () => {
    this.setState({
      allAnswers: [],
      correctAnswers: null,
      currentQuestion: this.state.allQuestions[0],
      progress: 0,
      resultsLoaded: false,
      showResults: false,
    });
  };

  render() {
    const {
      currentQuestion,
      loadNewQuestion,
      showResults,
      allAnswers,
      allQuestions,
      loadingResults,
      correctAnswers,
      resultsLoaded,
      progress,
    } = this.state;

    const { image } = currentQuestion;
    const headerImage = !showResults ? image : defaultImage;

    const navIsActive = allAnswers.length > 0;

    return (
      <div
        className={`${loadingResults && 'is-loading-results'} ${
          resultsLoaded ? 'is-showing-results' : 'no-results-loaded'
        }`}
      >
        <header>
          <img
            className={`fade-out ${loadNewQuestion && 'fade-out fade-out-active'}`}
            src={headerImage}
          />
        </header>

        {/* Content - start */}
        <div className={`content`}>
          <Progress progress={allAnswers.length} total={allQuestions.length} />

          {!showResults ? (
            <Question
              currentQuestion={currentQuestion}
              onSelectAnswer={this.onSelectAnswer}
              loadNewQuestion={loadNewQuestion}
              allAnswers={allAnswers}
            />
          ) : (
            <Results
              loadNewQuestion={loadNewQuestion}
              allQuestions={allQuestions}
              allAnswers={allAnswers}
              onLoadResults={this.onLoadResults}
              correctAnswers={correctAnswers}
              resultsLoaded={resultsLoaded}
              onRestart={this.onRestart}
            />
          )}
        </div>
        {/* Content - end */}

        <div className={`navigation text-center ${navIsActive && 'is-active'}`}>
          <Arrow
            direction="left"
            progress={progress}
            allAnswers={allAnswers}
            goToPreviousQuestion={this.goToPreviousQuestion}
            showResults={showResults}
          />
          <Arrow
            direction="right"
            progress={progress}
            allAnswers={allAnswers}
            goToNextQuestion={this.goToNextQuestion}
            showResults={showResults}
          />
        </div>
      </div>
    );
  }
}

export default App;
