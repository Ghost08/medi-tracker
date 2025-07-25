import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
export default function TabLayout() {
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

            <Tabs.Screen name='AddNew' options={{
                title: 'Add New',
                tabBarLabel: 'Add New',
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name='plus' size={size} color={color} />
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