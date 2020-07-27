import {extend} from "../../utils.js";
import {GameType} from "../../const.js";

const initialState = {
  mistakes: 0,
  maxMistakes: 3,
  step: -1
};

const Action = {
  GO_TO_WELCOME: `GO_TO_WELCOME`,
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  RESET: `RESET`,
};

const getAnswerChecker = (questionType) => {
  switch (questionType) {
    case GameType.ARTIST:
      return isArtistAnswerCorrect;
    case GameType.GENRE:
      return isGenreAnswerCorrect;
  }
  return null;
};

const isArtistAnswerCorrect = (question, userAnswers) => userAnswers.artist === question.song.artist;

const isGenreAnswerCorrect = (question, userAnswers) => {
  return userAnswers.every((answer, idx) => {
    return answer === (question.answers[idx].genre === question.genre);
  });
};

const ActionCreator = {
  incrementStep: () => ({
    type: Action.INCREMENT_STEP,
    payload: 1,
  }),

  incrementMistake: (question, userAnswers) => {
    const answerIsCorrect = getAnswerChecker(question.type)(question, userAnswers);

    return {
      type: Action.INCREMENT_MISTAKES,
      payload: answerIsCorrect ? 0 : 1,
    };
  },

  resetGame: () => {
    return {
      type: Action.RESET,
      payload: null,
    };
  },

  goToWelcome: () => {
    return {
      type: Action.GO_TO_WELCOME,
      payload: null,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.INCREMENT_STEP:
      return extend(state, {
        step: state.step + action.payload,
      });

    case Action.INCREMENT_MISTAKES:
      return extend(state, {
        mistakes: state.mistakes + action.payload,
      });

    case Action.RESET:
      return extend(initialState, {
        step: 0,
      });

    case Action.GO_TO_WELCOME:
      return extend(initialState, {
        step: -1,
      });
  }

  return state;
};


export {reducer, Action, ActionCreator};
