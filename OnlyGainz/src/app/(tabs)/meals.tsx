import { StyleSheet, Text, View } from "react-native";

export default function Meals() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to OnlyGainz!</Text>
      <Text>
        OnlyGainz is a fitness app that helps you track your workouts and
        progress.
      </Text>
      <Text>Get started by exploring the app and setting up your profile.</Text>
      <Text>
        Check out the documentation for more information on how to use the app.
      </Text>
      <Text>Happy lifting!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "white",
  },
  text: {
    color: "white",
  },
});
