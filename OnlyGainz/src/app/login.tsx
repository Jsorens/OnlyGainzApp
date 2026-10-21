import { ActivityIndicator, View,  TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { Redirect, Link } from 'expo-router';


export default function LoginScreen() {
  const { login, session, isAdmin, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log(
    "[LoginScreen] loading:", loading,
    "session:", session,
    "isAdmin:", isAdmin
  );

  const handleSubmit = async () => {
    await login({ email, password });
  };

  // While the login/checkAuth is in progress, show spinner
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  // Once we are *not* loading anymore:
  if (session) {
    if (isAdmin) {
      console.log("[LoginScreen] redirecting admin to /admin");
      return <Redirect href="/admin" />;
    } else {
      console.log("[LoginScreen] redirecting non-admin to /");
      return <Redirect href="/" />;
    }
  }

  return (
      <View  style={styles.container}>
        <View>
          <Text style={styles.headline}>Log In</Text>

          <Text>Email:</Text>
          <TextInput 
            placeholder='Enter your email...' 
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            />

          <Text>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            />

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Link href="/register">Register</Link>
          </View>
      </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    justifyContent: 'center',
  },
  headline:{
    textAlign:'center',
    marginTop:-100,
    marginBottom:50,
    fontWeight:700,
    fontStyle:'italic'
  },
  input:{
    borderWidth:1,
    borderRadius:10, 
    padding:10,
    color: "white",
    marginTop:10,
    marginBottom:10,
    borderColor:"grey"
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop:10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
})