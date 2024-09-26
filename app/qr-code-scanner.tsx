import { StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";
import FeatherIcons from "@expo/vector-icons/Feather";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BarCodeScanningResult } from "expo-camera/build/legacy/Camera.types";
import routeNames from "@/constants/routeNames";

export default function QRCodeScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const goBack = () => {
    router.back();
  };

  const handleBarcodeScanned = (result: BarCodeScanningResult) => {
    router.navigate({
      pathname: routeNames.BOOKING_SUCCESS,
      params: { data: result.data },
    });
  };

  if (!permission) {
    return <SafeAreaView />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <ThemedText style={styles.permissionText}>
          We need your permission to show the camera
        </ThemedText>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed ? { opacity: 0.5 } : {},
          ]}
          onPress={requestPermission}
        >
          <ThemedText type="defaultSemiBold" style={styles.buttonText}>
            Request Permission
          </ThemedText>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="subtitle" style={styles.title}>
          Scan QR Code
        </ThemedText>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed ? { opacity: 0.5 } : {},
          ]}
          onPress={goBack}
        >
          <FeatherIcons name="chevron-left" size={28} />
        </Pressable>
      </ThemedView>
      <ThemedView style={styles.subContainer}>
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={handleBarcodeScanned}
        />
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
  backButton: { position: "absolute", left: 14 },
  subContainer: { flex: 1, padding: 20 },
  camera: {
    height: "50%",
    minHeight: 300,
    maxHeight: 400,
  },
  button: {
    backgroundColor: "#4a65b9",
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: { color: "white", textAlign: "center" },
  permissionContainer: { justifyContent: "center", paddingHorizontal: 30 },
  permissionText: { marginBottom: 20 },
});
