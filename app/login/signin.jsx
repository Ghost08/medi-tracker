import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../../config/FirebaseConfig';
import Colors from '../../constant/Colors';
import { setLocalStorage } from '../../service/Storage';
export default function SignIn() {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const OnSignInClick = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please provide email and password.');
    } else {
      // Logic for signing in the user goes here
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in 
          const user = userCredential.user;
          await setLocalStorage('user', user); 
          router.push('/(tabs)');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Error signing in:', errorCode, errorMessage);
          if (errorCode === 'auth/invalid-credential') {
            Alert.alert('Error', 'Incorrect password. Please try again.');
          }
        });
    }
  }

  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.textHeader}>Let's Sign You In</Text>
      <Text style={styles.subHeader}>Welcome Back</Text>
      <Text style={styles.subHeader}>You've been missed!</Text>

      <View style={{ marginTop: 25 }}>
        <Text>Email</Text>
        <TextInput placeholder='Email' style={styles.textInput} onChangeText={(value) => setEmail(value)}></TextInput>
      </View>
      <View style={{ marginTop: 25 }}>
        <Text>Password</Text>
        <TextInput placeholder='Password' secureTextEntry={true} style={styles.textInput} onChangeText={(value) => setPassword(value)}></TextInput>
      </View>

      <TouchableOpacity style={styles.button} onPress={OnSignInClick}>
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 17 }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonCreate} onPress={() => router.push('login/signup')}>
        <Text style={{ textAlign: 'center', color: Colors.PRIMARY, fontSize: 17 }}>Create account</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create(
  {
    textHeader: {
      fontSize: 30,
      fontWight: 'bold',
      marginTop: 15,
    },
    subHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
      color: Colors.GRAY
    },
    textInput: {
      padding: 10,
      borderWidth: 1,
      fontSize: 17,
      borderRadius: 10,
      marginTop: 5,
      backgroundColor: 'white'
    },
    button: {
      padding: 15,
      backgroundColor: Colors.PRIMARY,
      borderRadius: 10,
      marginTop: 35,

    },
    buttonCreate: {
      padding: 15,
      backgroundColor: 'white',
      borderRadius: 10,
      marginTop: 20,
      borderWidth: 1,
      borderBlockColor: Colors.PRIMARY

    }

  }

)