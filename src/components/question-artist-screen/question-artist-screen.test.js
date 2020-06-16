import React from "react";
import renderer from "react-test-renderer";
import QuestionArtistScreen from "./question-artist-screen.jsx";

it(`Should QuestionGenreScreen render correctly`, () => {
  const tree = renderer
    .create(<QuestionArtistScreen

    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
