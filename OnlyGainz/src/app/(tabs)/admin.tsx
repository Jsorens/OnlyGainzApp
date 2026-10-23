import { StyleSheet, Text, View, Pressable } from "react-native";
import UserProfileCard from "../../features/profile/components/UserProfileCard";
import { useAuth } from "../../contexts/AuthProvider"
import { Redirect } from "expo-router";

export default function Admin() {
  const { user, session, isAdmin, logout, loading } = useAuth();

  if (loading) return null;

  console.log("admin --> isAdmin: ", isAdmin);
  console.log("admin --> user: ", user)
  
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