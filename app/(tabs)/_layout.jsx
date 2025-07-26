import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { getLocalStorage } from '../../service/Storage';
export default function TabLayout() {

    const router = useRouter();

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const user = await getLocalStorage('user');
        if (!user) {
            router.replace('/login');
        }
    }

    return (

        <Tabs screenOptions={{
            headerShown: false
        }}>
            <Tabs.Screen name='index' options={{
                title: 'Home',
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name='home' size={size} color={color} />
                )
            }}></Tabs.Screen>

            <Tabs.Screen name='History' options={{
                title: 'History',
                tabBarLabel: 'History',
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name='history' size={size} color={color} />
                )
            }}
            ></Tabs.Screen>
            <Tabs.Screen name='Profile'
                options={{
                    title: 'Profile',
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='user' size={size} color={color} />
                    )
                }}
            ></Tabs.Screen>
        </Tabs>
    )
}