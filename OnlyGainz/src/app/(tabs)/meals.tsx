import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import { Calendar } from "react-native-calendars";
import MealCardList from "@/components/meal/MealCardList";
import DailyNutritionSummary from "@/components/meal/DailyNutritionSummary";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useMeals } from "@/contexts/MealsContext";
//import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function Meals() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { date: selectedDate, setDate: setSelectedDate } = useMeals();
  console.log("Selected date:", selectedDate);

  console.log("Meals rendered");
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Selected date: {selectedDate?.toDateString()}
      </Text>
      <ScrollView>
        <Pressable onPress={() => setCalendarOpen(!calendarOpen)}>
          <FontAwesome name="calendar" size={50} color={"yellow"} />
        </Pressable>

        <Pressable
          onPress={() =>
            setSelectedDate(
              new Date(selectedDate.setDate(selectedDate.getDate() - 1)),
            )
          }
        >
          <Text style={styles.iconButton} aria-label="Forrige dag">
            Previous Day
          </Text>
        </Pressable>
        {calendarOpen && (
          <Calendar
            onDayPress={(day) => {
              setSelectedDate(new Date(day.dateString));
            }}
            style={{ backgroundColor: "black" }}
            theme={{
              backgroundColor: "black",
              calendarBackground: "black",
              textSectionTitleColor: "yellow",
              dayTextColor: "yellow",
              monthTextColor: "yellow",
              todayTextColor: "yellow",
            }}
          />
        )}
        <Pressable
          onPress={() =>
            setSelectedDate(
              new Date(selectedDate.setDate(selectedDate.getDate() + 1)),
            )
          }
        >
          <Text style={styles.iconButton} aria-label="Neste dag">
            Next Day
          </Text>
        </Pressable>
        <Text style={styles.title}>Welcome to OnlyGainz!</Text>
        <DailyNutritionSummary />
        <MealCardList />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    color: "yellow",
    fontSize: 18,
    marginVertical: 10,
  },
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
