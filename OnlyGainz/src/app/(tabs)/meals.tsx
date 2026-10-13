import { StyleSheet, Text, View } from "react-native";
import MealCardList from "@/features/meal/MealCardList";
export default function Meals() {
  console.log("Meals rendered");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to OnlyGainz!</Text>
      <View>
        <Text style={styles.title}>
          Calories: 2500, Protein: 140g, carbs: 250g, fat: 81g
        </Text>
      </View>
      <MealCardList />
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
