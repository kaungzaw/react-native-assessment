import { useRef, useMemo, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import RBSheet from "react-native-raw-bottom-sheet";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import RadioButton from "./RadioButton";
import useFilterStore from "@/store/filterStore";

export default function SortButton() {
  const ref = useRef<any>();
  const sortByList = useMemo(
    () => ["Location", "Capacity", "Availability"],
    []
  );
  const [sort, setSort] = useState("");
  const { setSortBy } = useFilterStore();
  const iconColor = useThemeColor({}, "icon");
  const backgroundColor = useThemeColor({}, "background");

  const show = () => {
    ref.current?.open();
  };

  const hide = () => {
    ref.current?.close();
  };

  const handleRadioButtonPress = (value: string) => {
    setSort(value);
  };

  const handleApply = () => {
    setSortBy(sort);
    hide();
  };

  const handleReset = () => {
    setSort("");
  };

  const styles = StyleSheet.create({
    sortButton: { flexDirection: "row", alignItems: "center" },
    title: { textAlign: "center" },
    subContainer: { flex: 1, justifyContent: "flex-end", paddingBottom: 30 },
    footer: {
      flexDirection: "row",
      paddingHorizontal: 28,
      columnGap: 16,
    },
    reset: {
      backgroundColor: "#4a4a53",
      flex: 1,
      paddingVertical: 10,
      borderRadius: 20,
    },
    button: {
      backgroundColor: "#4a65b9",
      flex: 2,
      paddingVertical: 10,
      borderRadius: 20,
    },
    buttonText: { color: "white", textAlign: "center" },
  });

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.sortButton,
          pressed ? { opacity: 0.5 } : {},
        ]}
        onPress={show}
      >
        <ThemedText>Sort </ThemedText>
        <MaterialCommunityIcons
          name="sort-variant"
          size={20}
          color={iconColor}
        />
      </Pressable>
      <RBSheet
        ref={ref}
        draggable
        dragOnContent
        closeOnPressBack
        height={560}
        customStyles={{
          container: {
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            backgroundColor,
          },
          draggableIcon: {
            marginVertical: 20,
            backgroundColor: "lightgrey",
          },
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
      >
        <ThemedText type="defaultSemiBold" style={styles.title}>
          Sort
        </ThemedText>
        {sortByList.map((item) => (
          <RadioButton
            key={item}
            label={item}
            selected={sort === item}
            onPress={() => handleRadioButtonPress(item)}
          />
        ))}
        <ThemedView style={styles.subContainer}>
          <ThemedView style={styles.footer}>
            <Pressable
              style={({ pressed }) => [
                styles.reset,
                pressed ? { opacity: 0.5 } : {},
              ]}
              onPress={handleReset}
            >
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                Reset
              </ThemedText>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed ? { opacity: 0.5 } : {},
              ]}
              onPress={handleApply}
            >
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                Apply
              </ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
      </RBSheet>
    </>
  );
}
