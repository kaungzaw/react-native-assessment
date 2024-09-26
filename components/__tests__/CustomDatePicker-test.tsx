import * as React from "react";
import { render } from "@testing-library/react-native";

import CustomDatePicker from "../CustomDatePicker";

it(`renders correctly`, () => {
  const tree = render(<CustomDatePicker />).toJSON();

  expect(tree).toMatchSnapshot();
});

describe("CustomDatePicker", () => {
  test("CustomDatePicker renders correctly", () => {
    const { getByText } = render(<CustomDatePicker />);

    getByText("Date");
  });
});
