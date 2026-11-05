import {
  View,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { useState } from "react";
import { useAuth } from "@/features/contexts/AuthProvider";
import { useOrientation } from "@/hooks/useOrientation";
import { Redirect, Link } from "expo-router";
import Logo from "@/features/shared/Logo";
export default function LoginScreen() {
  const { login, session, isAdmin, loading } = useAuth();
  const { isLandscape } = useOrientation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(
    "[LoginScreen] loading:",
    loading,
    "session:",
    session,
    "isAdmin:",
    isAdmin,
  );

  const handleSubmit = async () => {
    await login({ email, password });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View>
        <Text
          style={[styles.headline, isLandscape && styles.headlineLandscape]}
        >
          <Text style={styles.label}>Log In</Text>
        </Text>

        <Text style={styles.label}>Email:</Text>
        <TextInput
          placeholder="Enter your email..."
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Link href="/auth/register" style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register</Text>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  headline: {
    textAlign: "center",
    marginTop: -100,
    marginBottom: 50,
    fontWeight: 700,
    fontStyle: "italic",
  },
  headlineLandscape: {
    marginTop: 0,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: "white",
    marginTop: 10,
    marginBottom: 10,
    borderColor: "grey",
  },
  button: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  registerButton: {
    marginTop: 10,
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    backgroundColor: "grey",
    alignSelf: "center",
  },
  registerButtonText: {
    color: "white",
    fontSize: 18,
  },
  label: {
    color: "white",
    marginBottom: 4,
  },
});
