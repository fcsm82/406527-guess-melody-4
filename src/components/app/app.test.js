import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      errorsCount={3}
      questions={[
        {
          type: `genre`,
          genre: `rock`,
          answers: [{
            src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
            genre: `rock`,
          }, {
            src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
            genre: `blues`,
          }, {
            src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
            genre: `jazz`,
          }, {
            src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
            genre: `rock`,
          }]
        }, {
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
        }]
      }
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
