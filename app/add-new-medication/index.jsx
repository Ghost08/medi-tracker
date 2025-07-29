import { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import AddMedicationForm from '../../components/AddMedicationForm';
import AddMedicationHeader from '../../components/AddMedicationHeader';

export default function AddNewMedication() {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        // Simulate fetching data   
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <AddMedicationHeader />
            <AddMedicationForm isRefeshScreen={refreshing} />

        </ScrollView>
    )
}