import { View, Text, Pressable, Button, StyleSheet } from "react-native";
import type { Food } from "@/features/food/types/Food";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Link, router } from "expo-router";
import { useMeals } from "@/features/contexts/MealsContext";

type foodItemCardProp = {
  data: Food;
  mealType: string;
};

// Food item
// When we press it it will redirect us to another page where we can see more detail
// It will contain a button that adds the item to the meal
export function FoodItemCard({ data, mealType }: foodItemCardProp) {
  const router = useRouter();
  const { addFood } = useMeals();
  return (
    <View style={styles.card}>
      <Pressable
        style={({ pressed }) => [
          styles.info,
          pressed && styles.addButtonPressed,
        ]}
        onPress={() =>
          router.push({
            pathname: "/foods/[foodItemId]",
            params: {
              foodItemId: data.id,
              foodItemData: JSON.stringify(data),
              mealId: mealType,
            },
          })
        }
      >
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.kcal}>{data.macros.calories} kcal</Text>
        <Text style={styles.kcal}>{data.macros.protein} g protein</Text>
        <Text style={styles.kcal}>{data.macros.carbs} g carbs</Text>
        <Text style={styles.kcal}>{data.macros.fat} g fat</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.addButtonPressed,
        ]}
        onPress={() => addFood(data, 1, mealType)}
      >
        {({ pressed }) => (
          <Text style={[styles.addText, pressed && styles.addTextPressed]}>
            ADD
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#11140D",
    borderWidth: 1,
    borderColor: "#FFC21A",
    marginHorizontal: 12,
    marginVertical: 6,
  },
  info: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  name: {
    color: "#FFC21A",
    fontFamily: "monospace",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  kcal: {
    color: "#8A8466",
    fontFamily: "monospace",
    fontSize: 12,
    letterSpacing: 1,
    marginTop: 4,
  },
  addButton: {
    justifyContent: "center",
    flexShrink: 0,
    paddingHorizontal: 18,
    borderLeftWidth: 1,
    borderLeftColor: "#FFC21A",
  },
  addText: {
    color: "#FFC21A",
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 2,
  },
  addButtonPressed: {
    backgroundColor: "#FFC21A",
  },
  addTextPressed: {
    color: "#0A0C08",
  },
});
