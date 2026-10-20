import { StyleSheet, Text, View } from "react-native";
import UserProfileCard from "@/features/profile/components/UserProfileCard";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { useEffect } from "react";

export default function Admin() {
  const { user, session, isAdmin, logout } = useAuth();
  const router = useRouter();

useEffect(() => {
  if (!session) {
    router.replace("/login");
  }

  if (!isAdmin) {
    router.replace("/");
  }

}, [user, session, isAdmin, router]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin page</Text>
      <Text style={styles.text}>Admin name: {user ? user.name : "N/A"}</Text>
      <Text style={styles.text}></Text>

      <Pressable onPress={logout}><Text>Logout</Text></Pressable>
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