import { StyleSheet, View } from 'react-native'
import EmptyState from '../../components/EmptyState'
import Header from '../../components/Header'
import Colors from '../../constant/Colors'

export default function index() {

  return (
    <View style={{ padding: 25, backgroundColor: 'white', height: '100%', width: '100%' }}>
      <Header></Header>
      <EmptyState></EmptyState>
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