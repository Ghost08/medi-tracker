import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../../config/FirebaseConfig'; // Adjust the import path as necessary
import Colors from '../../constant/Colors';
import { getLocalStorage, removeLocalStorage } from '../../service/Storage';
export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const user = await getLocalStorage('user');
    setUser(user);
  }

  const handleLogout = async () => {

    await signOut(auth).then(async () => {
      // Sign-out successful.
      console.log('User signed out successfully');
      await removeLocalStorage();
      router.push('/login');

    }).catch((error) => {
      // An error happened.
      console.log('Error signing out:', error);
    });

  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>

      <Image source={require('../../assets/images/user.png')}
        style={{
          height: 100,
          width: 100
        }}
      ></Image>
      <Text style={{ textAlign: 'center',  marginTop: 10, fontSize: 17, fontWeight: 'bold' }}>{user?.displayName}</Text>

      <Text style={{ textAlign: 'center',  marginTop: 10,fontSize: 17, fontWeight: 'bold' }}>{user?.email}</Text>

      <TouchableOpacity style={{
        backgroundColor: Colors.PRIMARY, padding: 15,
        borderRadius: 10, marginTop: 10, alignItems: 'center',
        justifyContent: 'center',
        width: 200
      }} onPress={handleLogout}>
        <FontAwesome name="sign-out" size={17} color="white" />
        <Text style={{ textAlign: 'center', fontSize: 17, color: 'white' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}