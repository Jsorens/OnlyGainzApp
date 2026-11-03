import {
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
  Vibration,
} from "react-native";
import { useState } from "react";
import type { Food } from "@/features/food/types/Food";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Link, router } from "expo-router";
import { useMeals } from "@/features/contexts/MealsContext";
import { Buffering } from "@/features/shared/Buffering";

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

  const [buttonPressed, setButtonPressed] = useState(false);
  const handleAddFood = () => {
    addFood(data, 1, mealType);
    Vibration.vibrate(50);
    // Set the button as pressed to trigger visual feedback for a short duration
    setButtonPressed(true);
    setTimeout(() => setButtonPressed(false), 600);
  };
  return (
    <View style={styles.card}>
      <View style={styles.row}>
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
          onPress={() => {
            handleAddFood();
          }}
        >
          {({ pressed }) => (
            <Text style={[styles.addText, pressed && styles.addTextPressed]}>
              ADD
            </Text>
          )}
        </Pressable>
      </View>
      {buttonPressed && (
        <View style={styles.bufferingContainer}>
          <Buffering label="Adding..." />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bufferingContainer: {
    borderTopWidth: 1,
    borderTopColor: "#FFC21A",
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(10, 12, 8, 0.85)",
  },
  card: {
    // flexDirection: "row" fjernes herfra
    backgroundColor: "#11140D",
    borderWidth: 1,
    borderColor: "#FFC21A",
    marginHorizontal: 12,
    marginVertical: 6,
  },
  row: {
    flexDirection: "row",
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
