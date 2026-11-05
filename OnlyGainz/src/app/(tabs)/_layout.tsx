import { Tabs, Redirect, useRouter, useSegments } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useAuth } from "@/features/contexts/AuthProvider";
import { useEffect } from "react";
import Logo from "@/features/shared/Logo";
import { useOrientation } from "@/hooks/useOrientation";
//SplashScreen.preventAutoHideAsync();

const activeTintColor = "yellow";
const inactiveTintColor = "gray";

// Header and tab bar options depend on orientation: in landscape there is
// little vertical space, so the logo header shrinks and labels sit beside icons.
const getTabOptions = (isLandscape: boolean) =>
  ({
    tabBarLabelPosition: isLandscape ? "beside-icon" : "below-icon",
    tabBarShowLabel: true,
    headerTitle: () =>
      isLandscape ? (
        <Logo width={60} height={60} />
      ) : (
        <Logo width={120} height={120} />
      ),
    headerStyle: {
      backgroundColor: "#131312",
      height: isLandscape ? 70 : 130,
    },
    headerTitleAlign: "center",
  }) as const;

const tabScreenOptions = {
  tabBarActiveTintColor: activeTintColor,
  tabBarInactiveTintColor: inactiveTintColor,
};

const iconWidth = 24; // px

export default function TabLayout() {
  const { session, isAdmin } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { isLandscape } = useOrientation();
  /*
  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);
  */

  return (
    <Tabs screenOptions={getTabOptions(isLandscape)}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <FontAwesome name="home" size={iconWidth} color={color} />
              {focused && !isLandscape && <View style={styles.activeLine} />}
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
              {focused && !isLandscape && <View style={styles.activeLine} />}
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
              {focused && !isLandscape && <View style={styles.activeLine} />}
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
              {focused && !isLandscape && <View style={styles.activeLine} />}
            </View>
          ),
          ...tabScreenOptions,
        }}
      />

      {/* <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <FontAwesome name="gear" size={iconWidth} color={color} />
              {focused && !isLandscape && <View style={styles.activeLine} />}
            </View>
          ),
          ...tabScreenOptions,
        }}
      /> */}

      <Tabs.Protected guard={!!isAdmin}>
        <Tabs.Screen
          name="admin"
          options={{
            tabBarLabel: "Admin",
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.iconContainer}>
                <FontAwesome name="user" size={iconWidth} color={color} />
                {focused && !isLandscape && <View style={styles.activeLine} />}
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
