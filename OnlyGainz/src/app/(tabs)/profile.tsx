import { StyleSheet, Text, View } from "react-native";
import UserProfileCard from "../../components/profile/UserProfileCard";
import { UserProfile } from "@/Types/UserProfile";
import { userRepository } from "@/components/profile/userRepository";
import { useState, useEffect } from "react";

export default function Profile() {

  const [profile, setProfile] = useState<UserProfile>();

  useEffect(() => {
    async function loadProfile() {
      try {
        const user = await userRepository.list();
        setProfile(user);
      } 
      finally {
        if (profile !== undefined && profile.user === undefined) {
          return;
        }
      }
    }
    loadProfile();
  }, []);

  if (profile === undefined)
    return;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to OnlyGainz!</Text>
      <Text style={styles.text}>Profile</Text>
      <UserProfileCard data={ profile }/>
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