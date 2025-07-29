import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import moment from 'moment';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../../config/FirebaseConfig';
import Colors from '../../constant/Colors';
export default function MedicationActionModal() {
  const medication = useLocalSearchParams();
  const router = useRouter();
  

  const updateMedicationStatus = async (status) => {

    try {

      const docRef = doc(db, 'medications', medication?.id)

      // this logic always adds new entry in action
      await updateDoc(docRef, {
        action: arrayUnion({
          status: status,
          time: moment().format('LT'),
          date: medication?.selectedDate

        })
      });

      Alert.alert(status, 'Response saved', [
        {
          text: 'Ok',
          onPress: () => router.replace('(tabs)')
        }
      ])

    } catch (error) {

      console.log('error', error);

    }
  }
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/notification.gif')}
        style={{ width: 120, height: 120 }}
      ></Image>
      <Text style={{ fontSize: 18 }}>{medication?.selectedDate}</Text>
      <Text style={{ fontSize: 38, fontWeight: 'bold', color: Colors.PRIMARY }}>{medication?.reminder}</Text>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>It's time to take a medicine</Text>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{medication?.name}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.closeButton}
          onPress={() => updateMedicationStatus('Missed')}>
          <Ionicons name="close-outline" size={24} color="red" />
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'red' }}>Missed</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.successButton}
          onPress={() => updateMedicationStatus('Taken')}>
          <Ionicons name="checkmark-outline" size={24} color="white" />
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Taken</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={{
        position: 'absolute',
        bottom: 25
      }} onPress={() => router.back()}>
        <Ionicons name="close-circle" size={44} color={Colors.GRAY} />
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'white'

  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 25,
    alignItems: 'center'
  },
  closeButton: {
    padding: 10,
    flexDirection: 'row',
    gap: 6,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: 'red',
    borderRadius: 10,
  },
  successButton: {
    padding: 10,
    flexDirection: 'row',
    gap: 6,
    backgroundColor: Colors.GREEN,
    alignItems: 'center',
    borderRadius: 10

  }
})