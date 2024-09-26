import { StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { RoomAvailability } from "@/hooks/useRooms";

type RoomProps = RoomAvailability & {};

export default function Room({ name, capacity, level, available }: RoomProps) {
  const customBackgroundColor = useThemeColor({}, "customBackground");

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: customBackgroundColor,
      borderRadius: 10,
      marginBottom: 10,
    },
    subContainer: {
      backgroundColor: "transparent",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    box: {
      backgroundColor: "transparent",
      height: 2,
    },
    availableText: { color: "lightgreen", fontStyle: "italic" },
    notAvailableText: { color: "lightgrey", fontStyle: "italic" },
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.subContainer}>
        <ThemedText type="defaultSemiBold">{name}</ThemedText>
        {available ? (
          <ThemedText style={styles.availableText}>Available</ThemedText>
        ) : (
          <ThemedText style={styles.notAvailableText}>Not Available</ThemedText>
        )}
      </ThemedView>
      <ThemedView style={styles.box} />
      <ThemedView style={styles.subContainer}>
        <ThemedText>Level {level}</ThemedText>
        <ThemedText>{capacity} Pax</ThemedText>
      </ThemedView>
      <ThemedView style={styles.box} />
    </ThemedView>
  );
}
