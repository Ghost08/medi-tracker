import { FlatList, View } from 'react-native'
import Header from '../../components/Header'
import MedicationList from '../../components/MedicationList'

export default function index() {

  return (
    <FlatList
      style={{ height: '100%', backgroundColor: 'white' }}
      data={[]}
      ListHeaderComponent={
        <View style={{ padding: 25, backgroundColor: 'white', height: '100%', width: '100%' }}>
          <Header></Header>
          <MedicationList></MedicationList>
        </View>
      }
    />

  )
}

