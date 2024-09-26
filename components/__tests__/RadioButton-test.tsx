import * as React from "react";
import { render } from "@testing-library/react-native";

import RadioButton from "../RadioButton";

it(`renders correctly`, () => {
  const tree = render(
    <RadioButton label="RadioButton" onPress={() => {}} selected />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

describe("Room", () => {
  test("Room renders correctly", () => {
    const { getByText } = render(
      <RadioButton label="RadioButton" onPress={() => {}} selected />
    );

    getByText("RadioButton");
  });
});
