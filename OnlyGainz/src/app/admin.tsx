import { StyleSheet, Text, View } from "react-native";
import UserProfileCard from "@/features/profile/components/UserProfileCard";
import { useAuth } from "@/contexts/AuthContext";

export default function Admin() {
  const { user, isAdmin } = useAuth();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin page</Text>
      <Text style={styles.text}>Admin</Text>
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