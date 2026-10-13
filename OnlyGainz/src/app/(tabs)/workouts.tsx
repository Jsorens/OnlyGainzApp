import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Workouts() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Workout</Text>
      <Pressable onPress={() => 
          router.navigate({
              pathname: '/workout/createNewWorkoutRoutine'
          })
        }
      >
        <Text style={styles.text}>Add Exercise</Text>
      </Pressable>
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
