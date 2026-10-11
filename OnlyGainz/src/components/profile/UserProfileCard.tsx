import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { UserProfile } from "@/Types/UserProfile";
import { userRepository } from "./userRepository";
import React, { useEffect, useState } from "react";

type UserProfileProps = {
    data: UserProfile;
}

export default function UserProfileCard({ data }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState<UserProfile>(data);

  const handleEdit = () => {
    setEditableProfile(data);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditableProfile(data); // discard local changes
    setIsEditing(false);
  }

  const handleSave = async () => {
    try {
      const updated = await userRepository.updateProfile(editableProfile)
      setEditableProfile(updated);
      setIsEditing(false);
      console.log("Saved");
    }
    catch (e) {
      console.error("Failed to save profile ", e)
    }
  }

  const updateUserField = <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => {
      setEditableProfile(prev => ({
        ...prev,
        [key]: value,
      }))
  }

    return (
        <View style={styles.container}>
          <Text style={styles.text}>Username: {editableProfile.user.name}</Text>
          <Text style={styles.text}>Email: {editableProfile.user.email}</Text>

          {isEditing ? (
            <>
              <TextInput
                value={editableProfile.firstName}
                onChangeText={text => updateUserField("firstName", text)}
                placeholder="First name"
                />
              <TextInput 
                value={editableProfile.lastName}
                onChangeText={text => updateUserField("lastName", text)}
                placeholder="Last name"  
              />
            </>
          ) : (
            <Text style={styles.text}>Full name: {editableProfile.firstName} {editableProfile.lastName}</Text>
          )}

          {isEditing ? (
            <>
              <TextInput 
                value={editableProfile.bio ?? ""}
                onChangeText={text => updateUserField("bio", text)}
                placeholder="Bio"
              />
            </>
          ) : (
            <Text style={styles.text}>Bio: {editableProfile.bio}</Text>
          )}

          {isEditing ? (
            <>
              <TextInput 
                value={String(editableProfile.age)}
                onChangeText={text => updateUserField("age", Number(text))}
                placeholder="Age"
              />
            </>
          ) : (
            <Text style={styles.text}>Age: {editableProfile.age}</Text>
          )}
          
          {isEditing ? (
            <>
              <TextInput 
                value={editableProfile.location}
                onChangeText={text => updateUserField("location", text)}
                placeholder="Location"
              />
            </>
          ) : (
            <Text style={styles.text}>Location: {editableProfile.location}</Text>
          )}

          <Text style={styles.text}>Followers: {editableProfile.followersCount}</Text>
          <Text style={styles.text}>Joined: {editableProfile.createdAt}</Text>

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
