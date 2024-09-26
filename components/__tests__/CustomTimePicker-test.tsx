import * as React from "react";
import { render } from "@testing-library/react-native";

import CustomTimePicker from "../CustomTimePicker";

it(`renders correctly`, () => {
  const tree = render(<CustomTimePicker />).toJSON();

  expect(tree).toMatchSnapshot();
});

describe("CustomTimePicker", () => {
  test("CustomTimePicker renders correctly", () => {
    const { getByText } = render(<CustomTimePicker />);

    getByText("Time");
  });
});
