import { StyleSheet, Text, View } from "react-native";
import HomeIcon from "@/assets/images/svg/HomeIcon.svg";
export default function Home() {
  return (
    <View style={styles.container}>
      <HomeIcon width={200} height={200} color="yellow" />
      <Text style={styles.title}>Welcome to OnlyGainz!</Text>
      <Text style={styles.text}>
        OnlyGainz is a fitness app that helps you track your workouts and
        progress.
      </Text>
      <Text style={styles.text}>
        Get started by exploring the app and setting up your profile.
      </Text>
      <Text style={styles.text}>
        Check out the documentation for more information on how to use the app.
      </Text>
      <Text style={styles.text}>Happy lifting!</Text>
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
