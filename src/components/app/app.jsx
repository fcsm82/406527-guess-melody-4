import {BrowserRouter, Route, Switch} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import QuestionArtistScreen from "../question-artist-screen/question-artist-screen.jsx";
import QuestionGenreScreen from "../question-genre-screen/question-genre-screen.jsx";

const welcomeButtonHandler = () => {};

const App = (props) => {
  const {errorsCount} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <WelcomeScreen
            errorsCount={errorsCount}
            onWelcomeButtonClick={welcomeButtonHandler}
          />
        </Route>
        <Route exact path="/dev-artist">
          <QuestionArtistScreen />
        </Route>
        <Route exact path="/dev-genre">
          <QuestionGenreScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};


App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
};

export default App;
