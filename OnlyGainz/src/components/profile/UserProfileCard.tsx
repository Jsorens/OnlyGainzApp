import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
//import { UserProfile } from "@/Types/UserProfile";
import { DBUser, profileRepository } from "./profileRepository";
import { useUser } from "@/app/authProvider/context/UserContext";

type UserProfileProps = {
  data: string | null;
}

export default function UserProfileCard({ data }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<DBUser | null>();
  const { userId } = useUser();

  useEffect(() => {
    if (!userId) {
      setProfile(null);
      return;
    }

    const getProfile = async () => {
      try {
        if (!userId) return;
        const profile = await profileRepository.getById(userId); //skal bruke service
        setProfile(profile);
      }
      catch (e) {
        console.error("We couldn't find you: ", e);
      }
    };
  getProfile();
  }, [userId])
  
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (!profile) return; // lag error handling
    setProfile(profile); // discard local changes
    setIsEditing(false);
  }

  const handleSave = async () => {
    try {
      if (!userId || !profile) return;
      const updated = await profileRepository.updateProfile(userId, profile)
      setProfile(updated);
      setIsEditing(false);
      console.log("Saved");
    }
    catch (e) {
      console.error("Failed to save profile ", e)
    }
  }

const updateField = <K extends keyof DBUser>(key: K, value: DBUser[K]) => {
  setProfile(prev => {
    if (!prev) return prev;
    return {
      ...prev,
      [key]: value,
    };
  });
};

    return (
        <View style={styles.container}>
          <Text style={styles.text}>ID: {profile?.id}</Text>
          
          {isEditing ? (
            <>
              <TextInput 
                value={profile?.name}
                onChangeText={text => updateField("name", text)}
                placeholder="Name"
              />
            </>
          ) : (
            <Text style={styles.text}>Name: {profile?.name}</Text>
          )}

          {/* Buttons */}
          <View>
            {isEditing ? (
              <>
                <Pressable onPress={handleSave}>
                  <Text>Save</Text>
                </Pressable>
                <Pressable onPress={handleCancel}>
                  <Text>Cancel</Text>
                </Pressable>
              </>
            ) : (
              <Pressable onPress={handleEdit}>
                <Text>Edit</Text>
              </Pressable>
            )}
          </View>
        </View>
    )
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
