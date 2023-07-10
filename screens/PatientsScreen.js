import React from 'react'
import { FlatList, Alert, LogBox, View } from 'react-native';
import styled from 'styled-components/native'
import { Appoitment, SectionTitle, PlusButton } from '../components';
import { useEffect, useState } from 'react';
import { patientsApi } from '../utils/api'
import Icon from "react-native-vector-icons/FontAwesome"
import { useActionSheet  } from "@expo/react-native-action-sheet";
import { Input } from 'native-base';


const PatientsScreen = ({navigation}) => {

  const [patientsData, setPatientsData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchPatients = async () => {
    setIsLoading(true);
    const response = await patientsApi.get()
    setPatientsData(response.data.data)
    setIsLoading(false);
  }
  
  useEffect(() => { 
    fetchPatients();
  }, [])

  useEffect(() => {
    fetchPatients();
  },[navigation.getState().routes[0].params])

  const searchPatients = e => {
    setSearchValue(e.nativeEvent.text);
  }

  const { showActionSheetWithOptions } = useActionSheet();

  const openSheet = (item) => {

    const options = ["Изменить", "Удалить", "Отмена"];
    const destructiveButtonIndex = 1; //the first element in 'options' will denote the Delete option
    const cancelButtonIndex = 2; //Element number 2 in the array will be the 'Cancel' button
    const title = item.patient.fullname + ' - ' + item.time;
    const itemId = item._id;

    const icons = [
      <Icon name="exchange" size={20} />,
      <Icon name="trash" size={20} />,
      <Icon name="remove" size={20} />,
    ];
   
     showActionSheetWithOptions(
       {
         options,
         title,
         cancelButtonIndex, 
         destructiveButtonIndex, 
         icons
       },
       (buttonIndex) => {
           switch (buttonIndex) {
              case 0:
                console.log('Изменить')
                return;

              case 1:
                removePatient(itemId);
                return;

              case 2:
                return;
              
              default: 
                console.log('Обработчик не добавлен')
           }         
       }
     )};
   
  const removePatient = id => {
    Alert.alert(
      'удаление приёма',
      'Вы действительно хотите удалить приём ?',
      [
        {
          text: 'Отмена',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text:'Удалить', onPress: () => {
          patientsApi.remove(id).then(() => {
            fetchPatients();
          }).catch((e) => {
            console.log(e);
            setIsLoading(false);
          } )
        }}
      ],
      {cancelable: false},
    );
 }
    
  return (
   <Container>
    {
      patientsData 
      ? <>
          <SearchView>
            <Input style={{
              paddingLeft: 15,
              }} 
              placeholder='Поиск...' 
              variant="rounded"
              onChange={searchPatients}
            />
          </SearchView>
          <FlatList
            data = {patientsData.filter(
              item => 
                item.fullname
                .toLowerCase()
                .indexOf(searchValue.toLowerCase()) >= 0
                )}
            keyExtractor={(item, index) => index}
            onRefresh={fetchPatients}
            refreshing = {isLoading}
            renderItem={({item}) => <Appoitment 
              onLongPress = {(itemInfo) => openSheet(itemInfo)}
              item = {{
                patient: item,
                diagnosis: item.phone
              }} 
              navigate = {navigation.navigate}/>}
            renderSectionHeader={({section: {title}}) => (
              <SectionTitle> {title}</SectionTitle>
    )}
        />
         <PlusButton onPress = {() => navigation.navigate('AddPatient')} />
      </>
      : null
    }
  
 
 </Container>
  )
}

const SearchView = styled.View`
  padding: 20px;
`;

const Container = styled.View`
  flex: 1;
  background: white;
`;

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state. Check:',
]);

export default PatientsScreen