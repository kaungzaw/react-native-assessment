import { useEffect } from "react";
import { StyleSheet, Pressable, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { router, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import routeNames from "@/constants/routeNames";

export default function BookingSuccessScreen() {
  const { data } = useLocalSearchParams();

  const goToHome = () => {
    router.navigate(routeNames.HOME);
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      goToHome
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="subtitle" style={styles.title}>
          Book a Room
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.subContainer}>
        <WebView source={{ uri: data as string }} />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed ? { opacity: 0.5 } : {},
          ]}
          onPress={goToHome}
        >
          <ThemedText type="defaultSemiBold" style={styles.buttonText}>
            Back To Home
          </ThemedText>
        </Pressable>
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
  subContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 14,
    rowGap: 20,
  },
  button: {
    backgroundColor: "#4a65b9",
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: { color: "white", textAlign: "center" },
});
