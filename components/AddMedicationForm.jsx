import Ionicons from '@expo/vector-icons/Ionicons';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from '../config/FirebaseConfig';
import Colors from '../constant/Colors';
import { TypeList, WhenToTake } from '../constant/Options';
import { ConvertDateTimeToString, formatDate, formatTime, getDateRange } from '../service/ConvertDateTime';
import { getLocalStorage } from '../service/Storage';


export default function AddMedicationForm({ isRefeshScreen = false }) {

    const router = useRouter();
    
    const [formData, setFormData] = useState({});
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [showReminderTime, setShowReminderTime] = useState(false);
    const [loading, setLoading] = useState(false);

    // reset form values on screen pull to refresh
    useEffect(() => {
        if (isRefeshScreen) {
            setFormData({});
        }
    }, [isRefeshScreen == true])

    const onHandleInputChage = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }



    const saveMedication = async () => {

        const docId = Date.now().toString();
        const user = await getLocalStorage('user');

        if ((!formData?.name || !formData?.type || !formData?.dose || !formData?.when || !formData?.startDate || !formData?.endDate || !formData?.reminder)) {
            Alert.alert('Warning', 'Please fill all the fields');
            return;
        } else if (formData?.when === 'When To Take') {
            Alert.alert('Warning', 'Please select when to take option');
            return;
        }

        const dates = formData?.startDate && formData?.endDate ? getDateRange(formData?.startDate, formData?.endDate) : [];

        setLoading(true);
        try {

            await setDoc(doc(db, 'medications', docId), {
                ...formData,
                dates: dates,
                id: docId,
                userEmail: user?.email,
                createdAt: new Date().toISOString(),
            });
            setLoading(false);
            Alert.alert('Success', 'Medication saved successfully!', [
                {
                    text: 'OK',
                    onPress: () => {
                        setFormData({});
                        router.push('(tabs)');
                    }
                }
            ]);

        } catch (error) {
            setLoading(false);
            console.log('Error saving medication:', error);
            Alert.alert('Error', 'Failed to save medication. Please try again later.');

        }
    }


    return (
        <View style={{ padding: 25 }}>
            <Text style={styles.header}>Add New Medication</Text>
            <View style={styles.inputGroup}>
                <Ionicons style={styles.icon} name="medkit-outline" size={24} color="black" />
                <TextInput style={styles.textInput} maxLength={20} placeholder='Medicine Name' value={formData?.name}  onChangeText={(value) => onHandleInputChage('name', value)}></TextInput>
            </View>
            <FlatList data={TypeList} horizontal={true} style={{ marginTop: 10 }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={[styles.inputGroup, { marginRight: 10 }, {
                        backgroundColor: item.name === formData?.type?.name ? Colors.PRIMARY : 'white'
                    }]} onPress={() => onHandleInputChage('type', item)}>
                        <Text style={[styles.typeText, {
                            color: item.name === formData?.type?.name ? 'white' : Colors.DARK_GRAY,
                        }]}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            >

            </FlatList>

            <View style={styles.inputGroup}>
                <Ionicons style={styles.icon} name="eyedrop-outline" size={24} color="black" />
                <TextInput style={styles.textInput} placeholder='Dose ex. 2 , 5ml' maxLength={10} value={formData?.dose} onChangeText={(value) => onHandleInputChage('dose', value)}></TextInput>
            </View>

            <View style={styles.inputGroup}>
                <Ionicons style={styles.icon} name="time-outline" size={24} color="black" />
                <Picker
                    selectedValue={formData?.when}
                    onValueChange={(itemValue, itemIndex) => onHandleInputChage('when', itemValue)}
                    style={{ width: '90%' }}
                >
                    {WhenToTake.map((item, index) => (
                        <Picker.Item key={index} label={item} value={item} />
                    ))}
                </Picker>
            </View>
            <View style={styles.dateInputGroup}>
                <TouchableOpacity style={[styles.inputGroup, { flex: 1 }]} onPress={() => setShowStartDate(true)}>
                    <Ionicons style={styles.icon} name="calendar-outline" size={24} color="black" />
                    <Text style={styles.text}>{ConvertDateTimeToString(formData?.startDate) ?? 'Start Date'}</Text>

                </TouchableOpacity>
                {showStartDate &&
                    <RNDateTimePicker minimumDate={new Date()}
                        onChange={(event) => {
                            onHandleInputChage('startDate', formatDate(event.nativeEvent.timestamp));
                            setShowStartDate(false);
                        }}
                        value={new Date(formData?.startDate) ?? new Date()}>
                    </RNDateTimePicker>
                }
                <TouchableOpacity style={[styles.inputGroup, { flex: 1 }]} onPress={() => setShowEndDate(true)}>
                    <Ionicons style={styles.icon} name="calendar-outline" size={24} color="black" />
                    <Text style={styles.text}>{ConvertDateTimeToString(formData?.endDate) ?? 'End Date'}</Text>
                </TouchableOpacity>

                {showEndDate &&
                    <RNDateTimePicker minimumDate={new Date()}
                        onChange={(event) => {
                            onHandleInputChage('endDate', formatDate(event.nativeEvent.timestamp));
                            setShowEndDate(false);
                        }}
                        value={new Date(formData?.endDate) ?? new Date()}>
                    </RNDateTimePicker>
                }
            </View>
            <View style={styles.dateInputGroup}>
                <TouchableOpacity style={[styles.inputGroup, { flex: 1 }]} onPress={() => setShowReminderTime(true)}>
                    <Ionicons style={styles.icon} name="timer-outline" size={24} color="black" />
                    <Text style={styles.text}> {formData?.reminder ?? 'Select Reminder Time'}</Text>
                </TouchableOpacity>
            </View>
            {
                showReminderTime &&
                <RNDateTimePicker
                    mode='time'
                    onChange={(event) => {
                        onHandleInputChage('reminder', formatTime(event.nativeEvent.timestamp));
                        setShowReminderTime(false);
                    }}
                    value={new Date(formData?.reminder) ?? new Date()}
                >

                </RNDateTimePicker>
            }

            <TouchableOpacity style={styles.button}
                onPress={saveMedication}>
                {loading ? <ActivityIndicator size="large" color="white" /> :
                    <Text style={styles.buttonText}>Save Medication</Text>}
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.LIGHT_GRAY_BORDER,
        marginTop: 10,
        backgroundColor: 'white'
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: Colors.DARK_GRAY
    },
    icon: {
        color: Colors.PRIMARY,
        borderRightWidth: 1,
        paddingRight: 10,
        borderColor: Colors.GRAY
    },
    typeText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        padding: 10,
        fontSize: 14,
        flex: 1,
    },
    dateInputGroup: {
        flexDirection: 'row',
        gap: 10,
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        borderRadius: 10,
        marginTop: 35,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25
    },
    buttonText: {
        fontSize: 17,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }

})