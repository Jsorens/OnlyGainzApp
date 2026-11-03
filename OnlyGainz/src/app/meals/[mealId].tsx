// This represents a single food item.
import {
  View,
  SafeAreaView,
  Text,
  Pressable,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useEffect, useReducer, useState } from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import type { Food } from "@/features/food/types/Food";
import type { MealLog } from "@/features/meal/types/MealLog";
import FoodScreen from "@/app/foods";
import { useMeals } from "@/features/contexts/MealsContext";
import { router } from "expo-router";
// import { MealLog } from "@/Types/Meal/MealLog";
export default function MealDetail() {
  const { mealId } = useLocalSearchParams<{
    mealId: string;
  }>();
  const { getMeals, removeFood } = useMeals();
  // Tilstanden for måltid som er her

  const round1 = (n: number) => Math.round(n * 10) / 10;

  const { date: selectedDate } = useMeals();
  if (!selectedDate) return false;

  const loggedFoods = getMeals(mealId, selectedDate);

  console.log("Rendered", mealId, "Page");

  const handleRemove = (id: string) => {
    removeFood(id);
  };

  useEffect(() => {}, [mealId, selectedDate]);
  return (
    <SafeAreaView style={styles.screen}>
      <Stack.Screen options={{ title: mealId }} />
      <ScrollView contentContainerStyle={styles.list}>
        {loggedFoods.map((log: MealLog) => (
          <View key={log.id} style={styles.card}>
            <Text style={styles.name}>{log.foodItem.name}</Text>

            <View style={styles.macroRow}>
              <View style={styles.macroBox}>
                <Text style={styles.macroValue}>
                  {round1((log.foodItem.macros?.calories ?? 0) * log.quantity)}
                </Text>
                <Text style={styles.macroLabel}>KCAL</Text>
              </View>
              <View style={styles.macroBox}>
                <Text style={styles.macroValue}>
                  {round1((log.foodItem.macros?.protein ?? 0) * log.quantity)}
                </Text>
                <Text style={styles.macroLabel}>PROTEIN</Text>
              </View>
              <View style={styles.macroBox}>
                <Text style={styles.macroValue}>
                  {round1((log.foodItem.macros?.carbs ?? 0) * log.quantity)}
                </Text>
                <Text style={styles.macroLabel}>CARBS</Text>
              </View>
              <View style={styles.macroBox}>
                <Text style={styles.macroValue}>
                  {round1((log.foodItem.macros?.fat ?? 0) * log.quantity)}
                </Text>
                <Text style={styles.macroLabel}>FAT</Text>
              </View>
            </View>

            <Text style={styles.serving}>
              SERVING: {round1((log.foodItem.servingSize ?? 0) * log.quantity)}{" "}
              {log.foodItem.servingUnit ?? ""}
            </Text>

            <View style={styles.buttonRow}>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.editButtonPressed,
                ]}
                onPress={() =>
                  router.push({
                    pathname: "/meals/editMeal",
                    params: {
                      mealLog: JSON.stringify(log),
                      mealId: mealId,
                    },
                  })
                }
              >
                {({ pressed }) => (
                  <Text
                    style={[
                      styles.buttonText,
                      pressed && styles.editTextPressed,
                    ]}
                  >
                    EDIT
                  </Text>
                )}
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.removeButton,
                  pressed && styles.removeButtonPressed,
                ]}
                onPress={() => handleRemove(log.id)}
              >
                {({ pressed }) => (
                  <Text
                    style={[
                      styles.buttonText,
                      styles.removeText,
                      pressed && styles.removeTextPressed,
                    ]}
                  >
                    REMOVE
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        ))}

        {loggedFoods.length === 0 && (
          <Text style={styles.empty}>Her skal maten fra {mealId} vises</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0A0C08",
  },
  list: {
    padding: 12,
    gap: 12,
  },
  card: {
    backgroundColor: "#11140D",
    borderWidth: 1,
    borderColor: "#FFC21A",
    padding: 14,
  },
  name: {
    color: "#FFC21A",
    fontFamily: "monospace",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  macroRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  macroBox: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 194, 26, 0.35)",
    paddingVertical: 8,
  },
  macroValue: {
    color: "#FFC21A",
    fontFamily: "monospace",
    fontSize: 14,
    fontWeight: "700",
  },
  macroLabel: {
    color: "#8A8466",
    fontFamily: "monospace",
    fontSize: 9,
    letterSpacing: 1.5,
    marginTop: 4,
  },
  serving: {
    color: "#E8E2C8",
    fontFamily: "monospace",
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#FFC21A",
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFC21A",
    fontFamily: "monospace",
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 2,
  },
  removeButton: {
    borderColor: "#FF5A36",
  },
  removeText: {
    color: "#FF5A36",
  },
  empty: {
    color: "#8A8466",
    fontFamily: "monospace",
    fontSize: 12,
    letterSpacing: 1,
    textAlign: "center",
    marginTop: 24,
  },
  removeButtonPressed: {
    backgroundColor: "#ff0101",
  },
  removeTextPressed: {
    color: "#0A0C08",
  },

  editButtonPressed: {
    backgroundColor: "#FFC21A",
  },
  editTextPressed: {
    color: "#0A0C08",
  },
});
