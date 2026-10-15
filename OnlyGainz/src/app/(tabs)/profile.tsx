import { StyleSheet, Text, View } from "react-native";
import UserProfileCard from "@/features/profile/components/UserProfileCard";
import { useUser } from "../../authProvider/context/UserContext";

export default function Profile() {
  const { userId } = useUser();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to OnlyGainz!</Text>
      <Text style={styles.text}>Profile</Text>
      {userId ? <UserProfileCard data={ userId }/>
      : <Text>You are not logged in</Text>}
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