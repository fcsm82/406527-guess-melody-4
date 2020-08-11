import * as React from "react";
import * as renderer from "react-test-renderer";
import WelcomeScreen from "./welcome";
import {noop} from "../../../utils";


it(`Should WelcomeScreen render correctly`, () => {
  const tree = renderer
    .create(<WelcomeScreen
      errorsCount={3}
      onWelcomeButtonClick={noop}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
