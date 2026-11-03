import { useState } from "react";
import { Text, StyleSheet, Pressable, Modal, SafeAreaView } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function CameraButton() {
  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  async function openCamera() {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) return;
    }

    setShowCamera(true);
  }

  return (
    <>
      <Pressable style={styles.openButton} onPress={openCamera}>
        <FontAwesome name="barcode" size={22} color="#FFC21A" />
      </Pressable>

      <Modal
        visible={showCamera}
        animationType="slide"
        onRequestClose={() => setShowCamera(false)}
      >
        <SafeAreaView style={styles.container}>
          <CameraView style={styles.camera} facing="back" />

          <Pressable style={styles.button} onPress={() => setShowCamera(false)}>
            <FontAwesome name="times" size={20} color="#FFC21A" />
            <Text style={styles.buttonText}>LUKK KAMERA</Text>
          </Pressable>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0C08",
  },
  camera: {
    flex: 1,
  },
  button: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(10, 12, 8, 0.85)",
    borderWidth: 1,
    borderColor: "#FFC21A",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#FFC21A",
    fontFamily: "monospace",
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 2,
  },
  openButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFC21A",
    backgroundColor: "#11140D",
  },
});
