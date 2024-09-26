import { useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dayjs from "dayjs";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import useFilterStore from "@/store/filterStore";

export default function CustomTimePicker() {
  const [visible, setVisible] = useState(false);
  const { time, setTime } = useFilterStore();

  const handleConfirm = (value: Date) => {
    setTime(dayjs(value));
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
        <ThemedText style={styles.label}>Time</ThemedText>
        <ThemedView style={styles.input}>
          <ThemedText>{time?.format("h:mm A") ?? "Select Time"}</ThemedText>
        </ThemedView>
      </Pressable>
      <DateTimePickerModal
        isVisible={visible}
        date={time?.toDate() ?? dayjs("2024-10-10 08:00").toDate()}
        minimumDate={dayjs("2024-10-10 08:00").toDate()}
        maximumDate={dayjs("2024-10-10 19:30").toDate()}
        minuteInterval={30}
        mode="time"
        locale="en-US"
        onConfirm={handleConfirm}
        onCancel={hide}
      />
    </>
  );
}

const styles = StyleSheet.create({
  label: { color: "grey" },
  input: {
    backgroundColor: "transparent",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    paddingBottom: 6,
  },
});
