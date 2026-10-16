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
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function Meals() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  console.log("Meals rendered");
  return (
    <View style={styles.container}>
      <ScrollView>
        <Pressable onPress={() => setCalendarOpen(!calendarOpen)}>
          <FontAwesome name="calendar" size={50} color={"yellow"} />
        </Pressable>
        {calendarOpen && (
          <Calendar
            onDayPress={(day) => {
              console.log("Selected date:", day.dateString);
              setSelectedDate(day.dateString);
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

        <Text style={styles.title}>Welcome to OnlyGainz!</Text>
        <DailyNutritionSummary />
        <MealCardList />
      </ScrollView>
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
