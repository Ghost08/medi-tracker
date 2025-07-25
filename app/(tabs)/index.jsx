import { signOut } from 'firebase/auth'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../../config/FirebaseConfig'
import Colors from '../../constant/Colors'
import { removeLocalStorage } from '../../service/Storage'

export default function index() {

  const logOut = () => {
    signOut(auth).then(() => {
      console.log('User signed out successfully');
      // Clear user data from local storage
      removeLocalStorage();
    }).catch((error) => {
      console.log('Error signing out:', error);
    });
  }
  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.textHeader}>Home</Text>
      <TouchableOpacity style={styles.button} onPress={logOut()} >
        <Text style={{ textAlign: 'center', color: 'white' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 30,
    fontWight: 'bold',
    marginTop: 15,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginTop: 35,

  }
})