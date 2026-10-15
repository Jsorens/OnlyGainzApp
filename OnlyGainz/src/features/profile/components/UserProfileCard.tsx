import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { profileRepository, ProfileRepository } from "@/api/profile";
import { Profile } from "../types/Profile";
import { useAuth } from "@/contexts/AuthContext";

type UserProfileProps = {
  data: string | null;
}

export default function UserProfileCard({ data }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile | null>();
  const { user } = useAuth();

  if (!user) return;

  // reset profile if user logs out
  useEffect(() => {
    if (!user.id) {
      setProfile(null);
      return;
    }

    // get current users profile from db and save in profile state
    const getProfile = async () => {
      try {
        if (!user.id) return;
        const profile = await profileRepository.getById(user.id); //skal bruke service
        setProfile(profile);
      }
      catch (e) {
        console.error("We couldn't find you: ", e);
      }
    };
  getProfile();
  }, [user.id])
  
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
      if (!user.id || !profile) return;
      const updated = await profileRepository.updateProfile(user.id, profile)
      setProfile(updated);
      setIsEditing(false);
      console.log("Saved");
    }
    catch (e) {
      console.error("Failed to save profile ", e)
    }
  }

  // map changes to the profile state
  const updateField = <K extends keyof Profile>(key: K, value: Profile[K]) => {
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

          {isEditing ? (
            <>
              <TextInput 
                value={profile?.age}
                onChangeText={text => updateField("age", text)}
                placeholder="Age"
              />
            </>
          ) : (
            <Text style={styles.text}>Age: {profile?.age}</Text>
          )}

          {isEditing ? (
            <>
              <TextInput 
                value={profile?.bio}
                onChangeText={text => updateField("bio", text)}
                placeholder="Bio"
              />
            </>
          ) : (
            <Text style={styles.text}>Bio: {profile?.bio}</Text>
          )}

          {isEditing ? (
            <>
              <TextInput 
                value={profile?.city}
                onChangeText={text => updateField("city", text)}
                placeholder="City"
              />
            </>
          ) : (
            <Text style={styles.text}>City: {profile?.city}</Text>
          )}

          {isEditing ? (
            <>
              <TextInput 
                value={profile?.country}
                onChangeText={text => updateField("country", text)}
                placeholder="Country"
              />
            </>
          ) : (
            <Text style={styles.text}>Country: {profile?.country}</Text>
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
