import { Tabs, Redirect } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/contexts/AuthContext";

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
  const { session } = useAuth();
  return !session ? <Redirect href="/login"/> 
  : (
    <Tabs screenOptions={{ ...tabOptions }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <FontAwesome name="home" size={iconWidth} color={color} />
              {focused && <View style={styles.activeLine} />}
            </View>
          ),
          ...tabScreenOptions,
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          tabBarLabel: "Meals",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <FontAwesome name="cutlery" size={iconWidth} color={color} />
              {focused && <View style={styles.activeLine} />}
            </View>
          ),
          ...tabScreenOptions,
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          tabBarLabel: "Workouts",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <FontAwesome6 name="dumbbell" size={iconWidth} color={color} />
              {focused && <View style={styles.activeLine} />}
            </View>
          ),
          ...tabScreenOptions,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <FontAwesome name="user" size={iconWidth} color={color} />
              {focused && <View style={styles.activeLine} />}
            </View>
          ),
          ...tabScreenOptions,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <FontAwesome name="gear" size={iconWidth} color={color} />
              {focused && <View style={styles.activeLine} />}
            </View>
          ),
          ...tabScreenOptions,
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  activeLine: {
    position: "absolute",
    bottom: -20,
    width: 35,
    height: 3,
    backgroundColor: activeTintColor,
    borderRadius: 2,
  },
});
