import { SafeAreaView, View,  TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthProvider'
import { Redirect, Link } from 'expo-router'


const login = () => {
  const { session, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async () => {
      register({email, password, name})
  }

  return (
      <View  style={styles.container}>
        <View>
          <Text style={styles.headline}>Register</Text>

          <Text>Email:</Text>
          <TextInput 
            placeholder="Enter your email..."
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
            
          <Text>Name:</Text>
          <TextInput 
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            />

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <Link href="/auth/login">Login</Link>
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

export default login;