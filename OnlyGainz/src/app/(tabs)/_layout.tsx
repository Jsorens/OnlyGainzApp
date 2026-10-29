import { Tabs, Redirect, useRouter, useSegments } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useAuth } from "@/contexts/AuthProvider";
import { useEffect } from "react";

//SplashScreen.preventAutoHideAsync();

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
  const { session, isAdmin } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  /*
  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);
  */

  return (
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

      <Tabs.Protected guard={!!isAdmin}>
        <Tabs.Screen
          name="admin"
          options={{
            tabBarLabel: "Admin",
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.iconContainer}>
                <FontAwesome name="user" size={iconWidth} color={color} />
                {focused && <View style={styles.activeLine} />}
              </View>
            ),
            ...tabScreenOptions,
          }}
        />
      </Tabs.Protected>
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
