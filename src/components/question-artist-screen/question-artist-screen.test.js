import React from "react";
import renderer from "react-test-renderer";
import QuestionArtistScreen from "./question-artist-screen.jsx";

it(`Should QuestionGenreScreen render correctly`, () => {
  const tree = renderer
    .create(
        <QuestionArtistScreen
          question={
            {
              type: `artist`,
              song: {
                artist: `Jim Beam`,
                src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
              },
              answers: [{
                picture: `https://api.adorable.io/avatars/128/0`,
                artist: `John Snow`,
              }, {
                picture: `https://api.adorable.io/avatars/128/1`,
                artist: `John Snow`,
              }, {
                picture: `https://api.adorable.io/avatars/128/100`,
                artist: `John Snow`,
              }]
            }
          }
          onAnswer={() => {}}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
