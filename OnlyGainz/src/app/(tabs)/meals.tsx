import { StyleSheet, Text, View } from "react-native";
import MealCardList from "@/components/meal/MealCardList";
import DailyNutritionSummary from "@/components/meal/DailyNutritionSummary";

export default function Meals() {
  console.log("Meals rendered");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to OnlyGainz!</Text>
      <DailyNutritionSummary />
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
