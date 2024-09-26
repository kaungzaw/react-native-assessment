import { useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dayjs from "dayjs";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import useFilterStore from "@/store/filterStore";

export default function CustomDatePicker() {
  const [visible, setVisible] = useState(false);
  const { date, setDate } = useFilterStore();

  const handleConfirm = (value: Date) => {
    setDate(dayjs(value));
    hide();
  };

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  return (
    <>
      <Pressable
        style={({ pressed }) => [pressed ? { opacity: 0.5 } : {}]}
        onPress={show}
      >
        <ThemedText style={styles.label}>Date</ThemedText>
        <ThemedView style={styles.input}>
          <ThemedText>
            {date
              ? `${nthNumber(date.date())} ${date.format("MMM YYYY")}`
              : "Select Date"}
          </ThemedText>
        </ThemedView>
      </Pressable>
      <DateTimePickerModal
        isVisible={visible}
        date={date?.toDate() ?? dayjs().toDate()}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hide}
      />
    </>
  );
}

const nthNumber = (number: number) => {
  if (number > 3 && number < 21) return number + "th";
  switch (number % 10) {
    case 1:
      return number + "st";
    case 2:
      return number + "nd";
    case 3:
      return number + "rd";
    default:
      return number + "th";
  }
};

const styles = StyleSheet.create({
  label: { color: "grey" },
  input: {
    backgroundColor: "transparent",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    paddingBottom: 6,
  },
});
