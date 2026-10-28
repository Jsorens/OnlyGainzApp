import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useMeals } from "@/contexts/MealsContext";

const colors = {
  bg: "#0E1012",
  surface: "#171A1D",
  surface2: "#1E2226",
  border: "#2A3036",
  yellow: "#FFD24A",
  yellowDark: "#E0A800",
  yellowLight: "#FFE88A",
  muted: "#8D979F",
};

type Props = {
  calorieGoal?: number;
  proteinGoal?: number;
  carbsGoal?: number;
  fatGoal?: number;
};

// Oppsummering av dagens Nutrition
export default function DailyNutritionSummary({
  calorieGoal = 2500,
  proteinGoal = 150,
  carbsGoal = 250,
  fatGoal = 80,
}: Props) {
  const { getMacros } = useMeals();
  const { calories, protein, carbs, fat } = getMacros();

  const macros = [
    {
      label: "Protein",
      value: protein,
      goal: proteinGoal,
      color: colors.yellow,
    },
    { label: "Karbo", value: carbs, goal: carbsGoal, color: colors.yellowDark },
    { label: "Fett", value: fat, goal: fatGoal, color: colors.yellowLight },
  ];

  const remaining = Math.max(calorieGoal - calories, 0);

  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>I dag</Text>
      <Text style={styles.title}>Dagens næring</Text>

      <View style={styles.ringWrap}>
        <ProgressRing progress={calories / calorieGoal} />
        <View style={styles.ringCenter}>
          <Text style={styles.kcalValue}>{Math.round(calories)}</Text>
          <Text style={styles.kcalUnit}>av {calorieGoal} kcal</Text>
        </View>
      </View>
      <Text style={styles.remaining}>{Math.round(remaining)} kcal igjen</Text>

      <View style={styles.macroList}>
        {macros.map((m) => {
          const pct = Math.min(m.value / m.goal, 1) * 100;
          return (
            <View key={m.label}>
              <View style={styles.macroHeader}>
                <Text style={styles.macroLabel}>{m.label}</Text>
                <Text style={styles.macroValue}>
                  {Math.round(m.value)}
                  <Text style={styles.macroGoal}> / {m.goal} g</Text>
                </Text>
              </View>
              <View style={styles.track}>
                <View
                  style={[
                    styles.fill,
                    { width: `${pct}%`, backgroundColor: m.color },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function ProgressRing({
  progress,
  size = 190,
  strokeWidth = 14,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(progress, 0), 1);
  const offset = circumference * (1 - clamped);
  const center = size / 2;

  return (
    <Svg width={size} height={size}>
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke={colors.surface2}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke={colors.yellow}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${center} ${center})`}
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  eyebrow: {
    color: colors.yellow,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  title: {
    color: colors.yellow,
    fontSize: 26,
    fontWeight: "800",
    marginTop: 4,
  },
  ringWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  ringCenter: {
    position: "absolute",
    alignItems: "center",
  },
  kcalValue: {
    color: colors.yellow,
    fontSize: 44,
    fontWeight: "800",
    fontVariant: ["tabular-nums"],
  },
  kcalUnit: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "600",
  },
  remaining: {
    color: colors.muted,
    textAlign: "center",
    marginTop: 12,
    fontSize: 14,
  },
  macroList: {
    marginTop: 24,
    gap: 16,
  },
  macroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 6,
  },
  macroLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  macroValue: {
    color: colors.yellow,
    fontSize: 16,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
  macroGoal: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "400",
  },
  track: {
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.surface2,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 999,
  },
});
