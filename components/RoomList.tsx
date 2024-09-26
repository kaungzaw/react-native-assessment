import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import Room from "./Room";
import SortButton from "./SortButton";
import useRooms from "@/hooks/useRooms";
import useFilterStore from "@/store/filterStore";

export default function RoomList() {
  const { date, time } = useFilterStore();
  const { data: rooms, isLoading, error } = useRooms();

  return (
    <>
      <ThemedView style={styles.subContainer}>
        <ThemedText style={styles.subTitle}>Rooms</ThemedText>
        <SortButton />
      </ThemedView>
      {isLoading && (
        <ThemedView style={styles.center}>
          <ActivityIndicator size="large" color="lightgrey" />
        </ThemedView>
      )}
      {error && (
        <ThemedView style={styles.center}>
          <ThemedText>Error. {error.message}</ThemedText>
        </ThemedView>
      )}
      {!isLoading && !error && rooms && (
        <>
          {rooms.length === 0 && !(date && time) && (
            <ThemedView style={styles.center}>
              <ThemedText>Please select Date and Time</ThemedText>
            </ThemedView>
          )}
          {rooms.length === 0 && date && time && (
            <ThemedView style={styles.center}>
              <ThemedText>Rooms are not available</ThemedText>
            </ThemedView>
          )}
          <FlatList
            data={rooms}
            renderItem={({ item }) => <Room {...item} />}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  subTitle: {
    color: "grey",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
