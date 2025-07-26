import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../constant/Colors';
export default function MedicationCard({ medication, selectedDate = '' }) {

    const [status, setStatus] = useState();

    useEffect(() => {
        checkStatus();
    }, [medication])

    const checkStatus = () => {
        const data = medication?.action?.find((item) => item.date === selectedDate);
        setStatus(data);
    }

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
                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'black' }}>{medication?.dose} {medication?.type?.name}</Text>
                </View>
            </View >
            <View style={styles.reminderContainer}>
                <Ionicons name="timer-outline" size={24} color="black" />
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{medication?.reminder}</Text>
            </View>

            {
                status?.date &&
                <View style={styles.statusContainer}>
                    {
                        status?.status == 'Taken' ? <Ionicons name="checkmark-circle" size={24} color={Colors.GREEN} /> :
                            status?.status == 'Missed' && <Ionicons name="close-circle" size={24} color={'red'} />
                    }

                </View>
            }
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
    },
    statusContainer: {
        position: 'absolute',
        top: 5,
        padding: 7
    }
})