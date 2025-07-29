import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../../config/FirebaseConfig';
import Colors from '../../constant/Colors';
import { setLocalStorage } from '../../service/Storage';

export default function SignUp() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const OnCreateAccount = () => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email || !password || !userName) {
            Alert.alert('Error', 'Please fill in all fields.');
        }
        else if (!regex.test(email)) {
            Alert.alert('Error', 'Please provide valid email');
        }
        else {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    // Signed up 
                    const user = userCredential.user;

                    await updateProfile(user, {
                        displayName: userName
                    });

                    await setLocalStorage('user', user);

                    router.push('(tabs)');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log('Error creating user:', errorCode, errorMessage);

                    if (errorCode === 'auth/email-already-in-use') {
                        Alert.alert('Error', 'Email already in use. Please use a different email.');
                    }else if(errorCode==='auth/weak-password'){
                        Alert.alert('Error', 'Password should be at least 6 characters');
                    }
                });
        }
    }

    return (
        <View style={{ padding: 25 }}>
            <Text style={styles.textHeader}>Create New Account</Text>
            <View style={{ marginTop: 25 }}>
                <Text>Full Name</Text>
                <TextInput placeholder='Full Name' style={styles.textInput} onChangeText={(value) => setUserName(value)}></TextInput>
            </View>
            <View style={{ marginTop: 25 }}>
                <Text>Email</Text>
                <TextInput placeholder='Email' style={styles.textInput} onChangeText={(value) => setEmail(value)}></TextInput>
            </View>
            <View style={{ marginTop: 25 }}>
                <Text>Password</Text>
                <TextInput placeholder='Password' secureTextEntry={true} style={styles.textInput} onChangeText={(value) => setPassword(value)}></TextInput>
            </View>

            <TouchableOpacity style={styles.button} onPress={OnCreateAccount}>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 17 }}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCreate} onPress={() => router.push('login/signin')}>
                <Text style={{ textAlign: 'center', color: Colors.PRIMARY, fontSize: 17 }}>Already account? Sign In</Text>
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