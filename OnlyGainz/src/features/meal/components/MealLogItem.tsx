import { View, Text, Pressable, StyleSheet } from "react-native";
import type { MealLog } from "@/features/meal/types/MealLog";
import { router } from "expo-router";
import { Vibration } from "react-native";
import { useState } from "react";
import { useMeals } from "@/features/contexts/MealsContext";
import { Buffering } from "@/features/shared/Buffering";
type MealLogItemProps = {
  mealId: string;
  log: MealLog;
};

export function MealLogItem({ mealId, log }: MealLogItemProps) {
  const [buttonPressed, setButtonPressed] = useState(false);
  const { removeFood } = useMeals();

  const round1 = (n: number) => Math.round(n * 10) / 10;

  const handleRemove = () => {
    Vibration.vibrate(50);
    setButtonPressed(true);
    setTimeout(() => {
      // This timeout is used to provide a short delay for visual feedback after removing a food item
      setButtonPressed(false);
      removeFood(log.id);
    }, 1000);
  };
  return (
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
              style={[styles.buttonText, pressed && styles.editTextPressed]}
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
          onPress={() => handleRemove()}
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
      {buttonPressed && <Buffering label="Removing..." />}
    </View>
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
    backgroundColor: "#020202",
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
