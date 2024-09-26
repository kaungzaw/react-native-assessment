import * as React from "react";
import { render } from "@testing-library/react-native";

import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

it(`renders correctly`, () => {
  const tree = render(
    <ThemedView>
      <ThemedText>Snapshot test!</ThemedText>
    </ThemedView>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

describe("ThemedView", () => {
  test("ThemedView renders correctly", () => {
    const { getByText } = render(
      <ThemedView>
        <ThemedText>Snapshot test!</ThemedText>
      </ThemedView>
    );

    getByText("Snapshot test!");
  });
});
