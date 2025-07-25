import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import Colors from '../constant/Colors';
import { getLocalStorage } from '../service/Storage';
export default function Header() {

    const [user, setUser] = useState(null);
    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const user = await getLocalStorage('user');
        setUser(user);
        
    }

    return (
        <View style={{ marginTop: 20 }}>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' , width: '100%'}}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>

                    <Image source={require('../assets/images/smiley.png')}
                        style={{ width: 45, height: 45 }}></Image>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Hello {user?.displayName} 👋</Text>
                </View>
                 <Ionicons name="settings-outline" size={34} color={Colors.DARK_GRAY}/>
            </View>
           
        </View>
    )
}