import { useRouter } from 'expo-router'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../../constant/Colors'

export default function LoginScreen() {

    const router = useRouter()

    return (
        <View>
            <View style={{ display: 'flex', alignItems: 'center', marginTop: 40 }}>
                <Image
                    source={require('./../../assets/images/logo.png')}
                    style={styles.image}
                />
            </View>
            <View style={{ padding: 20, backgroundColor: Colors.PRIMARY, height: '100%', borderRadius: 25 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', textAlign: 'center' }}> Stay on Track, Stay Healthy!</Text>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 17, marginTop: 20 }}>Track your meds, Take control of your health. Stay consistent, Stay confident</Text>
                <TouchableOpacity style={styles.button} onPress={() => router.push('login/signin')}>
                    <Text style={{ textAlign: 'center', fontSize: 16, color: Colors.PRIMARY }}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: { width: 400, height: 400, borderRadius: 20 },
    button: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 99,
        marginTop: 20,
        alignItems: 'center',

    },
})