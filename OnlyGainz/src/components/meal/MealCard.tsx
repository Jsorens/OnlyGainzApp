import { Link } from "expo-router";
//import FoodLayout from "./FoodLayout";
import { Pressable, View, Text, Button } from "react-native";
import { StyleSheet } from "react-native";

// We want to be able to press the mealcard
// When the mealcard is press we wish to enter another "tab"/component
export default function MealCard({ mealType }: { mealType: string }) {
  return (
    <Link
      href="/foods"
      onPress={() => console.log("We navigate to /foods/index")}
    >
      <Text>{mealType}</Text>
      <Text style={styles.text}>Button</Text>
      <Text>Total Calories: 2000</Text>
    </Link>
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
