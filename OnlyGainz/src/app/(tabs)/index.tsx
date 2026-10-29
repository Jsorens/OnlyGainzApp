import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import HomeIcon from "@/assets/images/svg/HomeIcon.svg";
import DailyNutritionSummary from "@/components/meal/DailyNutritionSummary";
import { useAuth } from "@/contexts/AuthProvider";

export default function Home() {
  const { user, session, logout } = useAuth();

  return (
    <View style={styles.container}>
      <ScrollView>
        <Pressable style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
        <HomeIcon width={200} height={200} color="yellow" />
        <Text style={styles.title}>Welcome to OnlyGainz!</Text>

        {user && session && (
          <Text style={styles.title}>Hello {user.name}!</Text>
        )}

        <DailyNutritionSummary />

        <Text style={styles.text}>
          OnlyGainz is a fitness app that helps you track your workouts and
          progress.
        </Text>
        <Text style={styles.text}>
          Get started by exploring the app and setting up your profile.
        </Text>
        <Text style={styles.text}>
          Check out the documentation for more information on how to use the
          app.
        </Text>
        <Text style={styles.text}>Happy lifting!</Text>
      </ScrollView>
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
  button: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    margin: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
