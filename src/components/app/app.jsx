import React, {PureComponent} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import PropTypes from "prop-types";

import GameScreen from "../game-screen/game-screen.jsx";
import QuestionArtistScreen from "../question/artist/screen.jsx";
import QuestionGenreScreen from "../question/genre/screen.jsx";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player.js";

import {GameType} from "../../const.js";

const QuestionGenreScreenWrapped = withAudioPlayer(QuestionGenreScreen);
const QuestionArtistScreenWrapped = withAudioPlayer(QuestionArtistScreen);

class App extends PureComponent {
  render() {
    const [artistQuestion, genreQuestion] = this.props.questions;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/artist">
            <QuestionArtistScreenWrapped
              question={genreQuestion}
              onAnswer={() => {}}
            />
          </Route>
          <Route exact path="/genre">
            <QuestionGenreScreenWrapped
              question={artistQuestion}
              onAnswer={() => {}}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderGameScreen() {
    const {
      maxMistakes,
      questions,
      onUserAnswer,
      onWelcomeButtonClick,
      step,
    } = this.props;

    const question = questions[step];
    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen type={question.type}>
              <QuestionArtistScreenWrapped
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen type={question.type}>
              <QuestionGenreScreenWrapped
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
      }
    }

    return null;
  }
}
App.propTypes = {
  maxMistakes: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  step: state.step,
  maxMistakes: state.maxMistakes,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(question, answer));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
