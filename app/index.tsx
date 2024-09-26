import { useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import FeatherIcons from "@expo/vector-icons/Feather";
import dayjs from "dayjs";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomDatePicker from "@/components/CustomDatePicker";
import CustomTimePicker from "@/components/CustomTimePicker";
import RoomList from "@/components/RoomList";
import routeNames from "@/constants/routeNames";

export default function HomeScreen() {
  const iconColor = useThemeColor({}, "icon");

  const scanQrCode = () => {
    router.navigate(routeNames.QR_CODE_SCANNER);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="subtitle" style={styles.title}>
          Book a Room
        </ThemedText>
        <Pressable
          style={({ pressed }) => [
            styles.qrCodeButton,
            pressed ? { opacity: 0.5 } : {},
          ]}
          onPress={scanQrCode}
        >
          <FeatherIcons name="camera" size={28} color={iconColor} />
        </Pressable>
      </ThemedView>
      <ThemedView style={styles.subContainer}>
        <CustomDatePicker />
        <ThemedView style={styles.box} />
        <CustomTimePicker />
        <ThemedView style={styles.box} />
        <RoomList />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  title: { textAlign: "center" },
  qrCodeButton: { position: "absolute", right: 14 },
  subContainer: { flex: 1, paddingHorizontal: 14 },
  box: { height: 20 },
});
