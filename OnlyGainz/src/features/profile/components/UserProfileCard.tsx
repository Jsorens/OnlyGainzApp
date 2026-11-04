import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Vibration,
  KeyboardTypeOptions,
} from "react-native";
import { useEffect, useState } from "react";
import { useProfileAPI } from "@/features/profile/api/profile-api";
import { Profile } from "../types/Profile";
import { useAuth } from "@/features/contexts/AuthProvider";

type UserProfileProps = {
  data: string | null;
};

export default function UserProfileCard({ data }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  // Lagret versjon, brukes når man trykker Cancel
  const [savedProfile, setSavedProfile] = useState<Profile | null>(null);
  const { user } = useAuth();
  const { getProfileInfo, updateProfile } = useProfileAPI();

  // get current users profile from db and save in profile state
  useEffect(() => {
    setProfile(null);
    const getProfile = async () => {
      try {
        const result = await getProfileInfo();
        setProfile(result);
        setSavedProfile(result);
      } catch (e) {
        console.error("We couldn't find you: ", e);
      }
    };
    getProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setProfile(savedProfile);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      if (!profile) {
        console.error("No profile to update");
        return;
      }
      const updated = await updateProfile(profile);
      setProfile(updated);
      setSavedProfile(updated);
      setIsEditing(false);
    } catch (e) {
      console.error("Failed to save profile ", e);
    }
  };

  // map changes to the profile state
  const updateField = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    setProfile((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  // Ett felt: viser tekst, eller input når man redigerer
  const renderField = (
    label: string,
    value: string | number | null | undefined,
    onChange: (text: string) => void,
    keyboardType: KeyboardTypeOptions = "default",
  ) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={value != null ? String(value) : ""}
          onChangeText={onChange}
          placeholder={label}
          placeholderTextColor="#8A8466"
          keyboardType={keyboardType}
        />
      ) : (
        <Text style={styles.value}>{value || "—"}</Text>
      )}
    </View>
  );

  // Knapp som lyser gult og vibrerer ved trykk
  const renderButton = (title: string, onPress: () => void) => (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={() => {
        Vibration.vibrate(50);
        onPress();
      }}
    >
      {({ pressed }) => (
        <Text style={[styles.buttonText, pressed && styles.buttonTextPressed]}>
          {title}
        </Text>
      )}
    </Pressable>
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Profile</Text>

      {renderField("Name", profile?.name, (t) => updateField("name", t))}
      {renderField("Birthday", profile?.birthday, (t) =>
        updateField("birthday", t),
      )}
      {renderField("Bio", profile?.bio, (t) => updateField("bio", t))}
      {renderField("City", profile?.city, (t) => updateField("city", t))}
      {renderField("Country", profile?.country, (t) =>
        updateField("country", t),
      )}
      {renderField(
        "Calorie Goal",
        profile?.calorieGoal || "",
        (t) => updateField("calorieGoal", Number(t) || 0),
        "numeric",
      )}

      {/* Buttons */}
      <View style={styles.buttonRow}>
        {isEditing ? (
          <>
            {renderButton("SAVE", handleSave)}
            {renderButton("CANCEL", handleCancel)}
          </>
        ) : (
          renderButton("EDIT", handleEdit)
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#11140D",
    borderWidth: 1,
    borderColor: "#FFC21A",
    marginHorizontal: 12,
    marginVertical: 6,
    padding: 16,
  },
  title: {
    color: "#FFC21A",
    fontFamily: "monospace",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  row: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2D20",
  },
  label: {
    color: "#8A8466",
    fontFamily: "monospace",
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  value: {
    color: "#FFC21A",
    fontFamily: "monospace",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1,
  },
  input: {
    color: "#FFC21A",
    fontFamily: "monospace",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#FFC21A",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#FFC21A",
  },
  buttonPressed: {
    backgroundColor: "#FFC21A",
  },
  buttonText: {
    color: "#FFC21A",
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 2,
  },
  buttonTextPressed: {
    color: "#0A0C08",
  },
});
