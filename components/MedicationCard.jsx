import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../constant/Colors';
export default function MedicationCard({ medication }) {
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: medication?.type?.icon }}
                        style={{ width: 60, height: 60, borderRadius: 25 }}>
                    </Image>
                </View>
                <View >
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{medication?.name}</Text>
                    <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{medication?.when}</Text>
                    <Text style={{  fontSize: 10,fontWeight: 'bold', color: 'black' }}>{medication?.dose} {medication?.type?.name}</Text>
                </View>
            </View >
            <View style={styles.reminderContainer}>
                <Ionicons name="timer-outline" size={24} color="black" />
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{medication?.reminder}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.LIGHT_GRAY_BORDER,
        marginTop: 10,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    imageContainer: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        marginRight: 15,
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reminderContainer: {
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 120,
        borderWidth: 1,
        borderColor: Colors.LIGHT_GRAY_BORDER,
    }
})