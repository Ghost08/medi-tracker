import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constant/Colors';
import ConstantString from '../constant/ConstantString';

export default function EmptyState() {
    const router = useRouter();

    return (
        <View style={{ display: 'flex', alignItems: 'center', marginTop: 80 }}>
            <Image source={require('../assets/images/medicine.png')} style={{ height: 120, width: 120 }}></Image>
            <Text style={{ marginTop: 30, fontWeight: 'bold', fontSize: 35 }}>
                {ConstantString.NoMedication}</Text>
            <Text style={{ fontSize: 16, color: Colors.DARK_GRAY, textAlign: 'center', marginTop: 20 }}>{ConstantString.MedicationSubText}</Text>

            <TouchableOpacity style={{
                backgroundColor: Colors.PRIMARY, padding: 15, borderRadius: 10, marginTop: 35, width: '100%', alignItems: 'center', justifyContent: 'center'
            }}
                onPress={() => router.push('add-new-medication')}>
                <Text style={{ fontSize: 17, color: 'white', textAlign: 'center' }}>{ConstantString.AddNewMediciationBtn}</Text>
            </TouchableOpacity>
        </View>
    )
}