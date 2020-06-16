import React from "react";
import renderer from "react-test-renderer";
import QuestionGenreScreen from "./question-genre-screen.jsx";

it(`Should QuestionGenreScreen render correctly`, () => {
  const tree = renderer
    .create(<QuestionGenreScreen

    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
