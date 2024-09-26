import { Pressable, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

type RadioButtonProps = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

export default function RadioButton({
  label,
  selected = false,
  onPress,
}: RadioButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed ? { opacity: 0.5 } : {},
      ]}
      onPress={onPress}
    >
      <ThemedText>{label}</ThemedText>
      <ThemedView style={styles.radio}>
        {selected ? <ThemedView style={styles.radioSelected} /> : null}
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    marginHorizontal: 30,
    marginVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radio: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "grey",
  },
});
