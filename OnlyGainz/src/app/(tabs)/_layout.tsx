import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const activeTintColor = "yellow";
const inactiveTintColor = "gray";

const tabOptions = {
  tabBarLabelPositon: "beside-icon",
  tabBarShowLabel: true,
  headerTitle: "OnlyGainz",
};

const tabScreenOptions = {
  tabBarActiveTintColor: activeTintColor,
  tabBarInactiveTintColor: inactiveTintColor,
};

const iconWidth = 24; // px

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ ...tabOptions }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={iconWidth} color={color} />
          ),
          ...tabScreenOptions,
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          tabBarLabel: "Meals",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="cutlery" size={iconWidth} color={color} />
          ),
          ...tabScreenOptions,
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          tabBarLabel: "Workouts",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="dumbbell" size={iconWidth} color={color} />
          ),
          ...tabScreenOptions,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={iconWidth} color={color} />
          ),
          ...tabScreenOptions,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="gear" size={iconWidth} color={color} />
          ),
          ...tabScreenOptions,
        }}
      />
    </Tabs>
  );
}
