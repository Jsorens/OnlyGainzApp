import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

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

  if (!showCamera) {
    return <Button title="Åpne kamera" onPress={openCamera} />;
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" />

      <Button title="Lukk kamera" onPress={() => setShowCamera(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 450,
    width: "100%",
  },
  camera: {
    flex: 1,
  },
});
