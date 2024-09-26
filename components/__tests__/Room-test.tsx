import * as React from "react";
import { render } from "@testing-library/react-native";

import Room from "../Room";

it(`renders correctly`, () => {
  const tree = render(
    <Room name="Room Name" capacity={2} level={3} available />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

describe("Room", () => {
  test("Room renders correctly", () => {
    const { getByText } = render(
      <Room name="Room Name" capacity={2} level={3} available />
    );

    getByText("Room Name");
    getByText("2 Pax");
    getByText("Level 3");
  });
});
