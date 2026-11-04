import { Food } from "@/features/food/types/Food";
import { useLocalSearchParams } from "expo-router";
import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native";
import ServingSize from "@/features/food/components/ServingSize";
import { useState } from "react";
import { MealLog } from "@/features/meal/types/MealLog";
import { useMeals } from "@/features/contexts/MealsContext";
import { Buffering } from "@/features/shared/Buffering";
export default function EditMealScreen() {
  // Vi deconstruncter den innsendte dataen
  const { mealLog, mealId } = useLocalSearchParams<{
    mealLog?: string;
    mealId?: string;
  }>();
  console.log(mealLog);

  const [buttonPressed, setButtonPressed] = useState(false);

  const handleSave = () => {
    setButtonPressed(true);
    setTimeout(() => {
      editFood(data, numQuantity);
      setButtonPressed(false);
    }, 1000);
  };
  const { editFood } = useMeals();
  let data: MealLog;
  if (!mealLog) {
    return <Text>Invalid food data</Text>;
  }

  // Vi parser dataen til å være et food item
  try {
    data = JSON.parse(mealLog) as MealLog;
  } catch {
    return <Text>Invalid food data</Text>;
  }

  const [quantity, setQuantity] = useState(String(data.quantity));
  // Konverterer fra string til number
  const numQuantity = Number(quantity) || 0;

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.name}>{data?.foodItem?.name ?? "Unknown Food"}</Text>

      <View style={styles.macroRow}>
        <View style={styles.macroBox}>
          <Text style={styles.macroValue}>
            {Math.round(
              (data?.foodItem?.macros?.calories ?? 0) * numQuantity * 10,
            ) / 10}
          </Text>
          <Text style={styles.macroLabel}>KCAL</Text>
        </View>
        <View style={styles.macroBox}>
          <Text style={styles.macroValue}>
            {Math.round(
              (data?.foodItem?.macros?.protein ?? 0) * numQuantity * 10,
            ) / 10}
          </Text>
          <Text style={styles.macroLabel}>PROTEIN</Text>
        </View>
        <View style={styles.macroBox}>
          <Text style={styles.macroValue}>
            {Math.round(
              (data?.foodItem?.macros?.carbs ?? 0) * numQuantity * 10,
            ) / 10}
          </Text>
          <Text style={styles.macroLabel}>CARBS</Text>
        </View>
        <View style={styles.macroBox}>
          <Text style={styles.macroValue}>
            {Math.round((data?.foodItem?.macros?.fat ?? 0) * numQuantity * 10) /
              10}
          </Text>
          <Text style={styles.macroLabel}>FAT</Text>
        </View>
      </View>

      <Text style={styles.label}>QUANTITY</Text>
      <ServingSize amount={quantity} setAmount={setQuantity} />
      <Pressable
        onPress={handleSave}
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.editButtonPressed,
        ]}
      >
        {({ pressed }) => (
          <Text style={[styles.addText, pressed && styles.editTextPressed]}>
            SAVE
          </Text>
        )}
      </Pressable>
      {buttonPressed && <Buffering label="Saving Changes..." />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0A0C08",
    padding: 12,
  },
  panel: {
    backgroundColor: "#11140D",
    borderWidth: 1,
    borderColor: "#FFC21A",
    padding: 16,
  },
  name: {
    color: "#FFC21A",
    fontFamily: "monospace",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  macroRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  macroBox: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 194, 26, 0.35)",
    paddingVertical: 10,
  },
  macroValue: {
    color: "#FFC21A",
    fontFamily: "monospace",
    fontSize: 16,
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
    marginBottom: 16,
  },
  label: {
    color: "#8A8466",
    fontFamily: "monospace",
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 8,
  },
  addButton: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#FFC21A",
    paddingVertical: 14,
    alignItems: "center",
  },
  addText: {
    color: "#FFC21A",
    fontFamily: "monospace",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 3,
  },
  editButtonPressed: {
    backgroundColor: "#FFC21A",
  },
  editTextPressed: {
    color: "#0A0C08",
  },
  removeButtonPressed: {
    backgroundColor: "#FFC21A",
  },
  removeTextPressed: {
    color: "#0A0C08",
  },
});
