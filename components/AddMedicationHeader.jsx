import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Image, TouchableOpacity, View } from 'react-native';

export default function AddMedicationHeader() {
    const router = useRouter();
    return (
        <View>
            <Image source={require('../assets/images/consult.png')} style={{   height: 280, width: '100%' }} />
            <TouchableOpacity style={{ position: 'absolute', top: 40, left: 20, zIndex: 1 }} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}