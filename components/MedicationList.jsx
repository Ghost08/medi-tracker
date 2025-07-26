import { collection, getDocs, query, where } from "firebase/firestore";
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../config/FirebaseConfig';
import Colors from '../constant/Colors';
import { getDisplayDateRange } from '../service/ConvertDateTime';
import { getLocalStorage } from '../service/Storage';
import EmptyState from "./EmptyState";
import MedicationCard from "./MedicationCard";
export default function MedicationList() {

    const [medlist, setMedlist] = useState([]);
    const [dateRange, setDateRange] = useState([]);
    const [selectedDate, setSelectedDate] = useState(moment().format('DD/MM/YYYY'));
    const [loading, setLoading] = useState(false);

    const getDateRange = () => {
        const range = getDisplayDateRange(7);
        setDateRange(range);
        console.log(range);
    }

    const getMedications = async (selectedDate) => {
        setLoading(true);
        const user = await getLocalStorage('user');
        setMedlist([]);
        try {
            const q = query(collection(db, 'medications'),
                where('userEmail', '==', user?.email),
                where('dates', 'array-contains', selectedDate));

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                setMedlist(prev => [...prev, { ...doc.data(), id: doc.id }]);
            });
            setLoading(false);
            console.log('Medications fetched:', medlist);

        } catch (error) {
            setLoading(false);
            setMedlist([]);
            console.log('Error fetching medications:', error);

        }
    }

    useEffect(() => { getDateRange(); getMedications(selectedDate) }, []);
    return (
        <View style={{ marginTop: 25 }}>

            <Image source={require('../assets/images/medication.jpeg')}
                style={{ width: '100%', height: 200, borderRadius: 15 }}></Image>

            <FlatList
                style={{ marginTop: 10 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={dateRange}
                renderItem={({ item, index }) => (

                    <TouchableOpacity style={[styles.dateGroup, {
                        backgroundColor: item.formattedDate === selectedDate ? Colors.PRIMARY : Colors.LIGHT_GRAY_BORDER
                    }]}
                        onPress={() => {
                            setSelectedDate(item.formattedDate);
                            getMedications(item.formattedDate)
                        }}>
                        <Text style={[styles.day, { color: item.formattedDate === selectedDate ? 'white' : 'black' }]}>{item.day}</Text>
                        <Text style={[styles.date, { color: item.formattedDate === selectedDate ? 'white' : 'black' }]}>{item.date}</Text>
                    </TouchableOpacity>
                )}
            />

            {
                medlist?.length == 0 && !loading ? <EmptyState /> :
                    <FlatList
                        data={medlist}
                        onRefresh={() => getMedications(selectedDate)}
                        refreshing={loading}
                        renderItem={({ item, index }) => (
                            <MedicationCard medication={item}></MedicationCard>
                        )}
                    />
            }

        </View>
    )
}

const styles = StyleSheet.create({
    dateGroup: {
        padding: 15,
        backgroundColor: Colors.LIGHT_GRAY_BORDER,
        display: 'flex',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 10,
    },
    day: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 26,
        fontWeight: 'bold',
    }
})