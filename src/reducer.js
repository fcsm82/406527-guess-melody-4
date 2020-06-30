import {extend} from "./utils.js";
import {GameType} from "./const.js";
import questions from "./mocks/questions.js";

const initialState = {
  mistakes: 0,
  maxMistakes: 3,
  step: -1,
  questions,
};

const Action = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.INCREMENT_STEP:
      let nextStep = state.step + action.payload;

      if (nextStep >= state.questions.length) {
        return extend({}, initialState);
      }

      return extend(state, {
        step: nextStep,
      });

    case Action.INCREMENT_MISTAKES:
      const mistakes = state.mistakes + action.payload;

      if (mistakes >= state.maxMistakes) {
        return extend({}, initialState);
      }

      return extend(state, {
        mistakes: state.mistakes + action.payload,
      });

    default:
      return state;
  }
};


export {reducer, Action, ActionCreator};
