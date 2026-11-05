import {
  SafeAreaView,
  View,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { useAuth } from "@/features/contexts/AuthProvider";
import { useOrientation } from "@/hooks/useOrientation";
import { Redirect, Link } from "expo-router";

const login = () => {
  const { session, register } = useAuth();
  const { isLandscape } = useOrientation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    register({ email, password, name });
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
          <Text style={styles.label}>Register</Text>
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

        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <Link href="/auth/login">Login</Link>
      </View>
    </ScrollView>
  );
};

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
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,

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
  label: {
    color: "white",
    marginBottom: 4,
  },
});

export default login;
