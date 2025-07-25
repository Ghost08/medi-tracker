import { Redirect } from 'expo-router'
import { Text, View } from 'react-native'

export default function index() {
  return (
    <View>
      <Text>index</Text>
      <Redirect href="/login" />
    </View>
  )
}