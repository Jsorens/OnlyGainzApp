import { useRouter } from "expo-router";
import { Pressable, View, Text, StyleSheet } from "react-native";

type mealCardProps = {
  mealType: string;
};

// Måltidskort
// Trykk på kortet åpner måltidet, trykk på "+ ADD FOOD" åpner matlisten
export default function MealCard({ mealType }: mealCardProps) {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <Pressable
        style={({ pressed }) => [styles.header, pressed && styles.pressed]}
        onPress={() =>
          router.push({
            pathname: "/meals/[mealId]",
            params: { mealId: mealType },
          })
        }
      >
        {({ pressed }) => (
          <>
            <Text style={[styles.title, pressed && styles.textPressed]}>
              {mealType}
            </Text>
            <Text style={[styles.arrow, pressed && styles.textPressed]}>›</Text>
          </>
        )}
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
        onPress={() =>
          router.push({
            pathname: "/foods",
            params: { mealId: mealType },
          })
        }
      >
        {({ pressed }) => (
          <Text style={[styles.addText, pressed && styles.textPressed]}>
            + ADD FOOD
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#080808",
    borderWidth: 1,
    borderColor: "#FFC21A",
    marginHorizontal: 12,
    marginVertical: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  title: {
    color: "#FFC21A",
    fontFamily: "monospace",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  arrow: {
    color: "#8A8466",
    fontFamily: "monospace",
    fontSize: 22,
  },
  addButton: {
    borderTopWidth: 1,
    borderTopColor: "#FFC21A",
    paddingVertical: 12,
    alignItems: "center",
  },
  addText: {
    color: "#FFC21A",
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 2,
  },
  pressed: {
    backgroundColor: "#FFC21A",
  },
  textPressed: {
    color: "#0A0C08",
  },
});
