import { collection, getDocs, query, where } from "firebase/firestore";
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MedicationCard from "../../components/MedicationCard";
import { db } from "../../config/FirebaseConfig";
import Colors from '../../constant/Colors';
import { getDisplayPrevDateRange } from '../../service/ConvertDateTime';
import { getLocalStorage } from '../../service/Storage';

export default function History() {
  const [dateRange, setDateRange] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('DD/MM/YYYY'));
  const [loading, setLoading] = useState(false);
  const [medlist, setMedlist] = useState([]);
  useEffect(() => {
    getDateList();
    getMedications(selectedDate);
  }, [])

  const getDateList = () => {
    const dates = getDisplayPrevDateRange(7);
    setDateRange(dates)
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

    } catch (error) {
      setLoading(false);
      setMedlist([]);
      console.log('Error fetching medications:', error);

    }
  }
  return (

    <FlatList
      style={{ height: '100%', backgroundColor: 'white' }}
      data={[]}
      ListFooterComponent={
        <View style={styles.mainContainer}>
          <Image source={require('../../assets/images/med-history.png')} style={styles.imageBanner} />
          <Text style={styles.header}>Medication History</Text>

          <FlatList
            style={{ marginTop: 15 }}
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
            medlist?.length == 0 && !loading ? <Text style={{ fontSize: 25, padding: 30, fontWeight: 'bold', color: Colors.GRAY, textAlign: 'center' }}>No Medication Found!</Text> :
              <FlatList
                data={medlist}
                onRefresh={() => getMedications(selectedDate)}
                refreshing={loading}
                renderItem={({ item, index }) => (
                  <View >
                    <MedicationCard medication={item} selectedDate={selectedDate}></MedicationCard>
                  </View>
                )}
              />
          }
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 25,
    backgroundColor: 'white',

  },
  imageBanner: {
    width: '100%',
    height: 200,
    borderRadius: 15
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20
  },
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