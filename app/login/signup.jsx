import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../../constant/Colors';

export default function SignUp() {
    const router = useRouter();
    return (
        <View style={{ padding: 25 }}>
            <Text style={styles.textHeader}>Create New Account</Text>
            <View style={{ marginTop: 25 }}>
                <Text>Full Name</Text>
                <TextInput placeholder='Full Name' style={styles.textInput}></TextInput>
            </View>
            <View style={{ marginTop: 25 }}>
                <Text>Email</Text>
                <TextInput placeholder='Email' style={styles.textInput}></TextInput>
            </View>
            <View style={{ marginTop: 25 }}>
                <Text>Password</Text>
                <TextInput placeholder='Password' secureTextEntry={true} style={styles.textInput}></TextInput>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => console.log('Create account pressed')}>
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