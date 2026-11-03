import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

//import { Theme } from "@/constants/theme";

type LoadingProps = {
  label?: string;
};

export function Buffering({ label = "Laster..." }: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FFC21A" />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignSelf i stedet for flex: 1 - boksen skal ta plassen den trenger,
    // også når den ligger inne i en ScrollView uten fast høyde.
    alignSelf: "center",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#FFC21A",
    borderRadius: 8,
    backgroundColor: "#11140D",
  },
  text: {
    fontSize: 16,
    color: "#FFC21A",
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
});
