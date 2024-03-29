import React from 'react'
import { FlatList, Alert, LogBox, View } from 'react-native';
import styled from 'styled-components/native'
import { Appoitment, SectionTitle, PlusButton } from '../components';
import { useEffect, useState } from 'react';
import { patientsApi, appoitmentsApi } from '../utils/api'
import Icon from "react-native-vector-icons/FontAwesome"
import { useActionSheet  } from "@expo/react-native-action-sheet";
import { Input } from 'native-base';
import { Spinner, Heading, HStack } from "native-base";

const PatientsScreen = ({navigation}) => {

  const [patientsData, setPatientsData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchPatients = async () => {
    setIsLoading(true);
    const response = await patientsApi.get().catch(() => {
      alert('Ошибка подключения. Пожалуйста, включите интернет и перезагрузите приложение')
    })
    setPatientsData(response.data.data)
    setIsLoading(false);
  }
  
  useEffect(() => { 
    fetchPatients();
  }, [navigation.getState().routes[1].params])

  const searchPatients = e => {
    setSearchValue(e.nativeEvent.text);
  }

  const { showActionSheetWithOptions } = useActionSheet(); 

  const openSheet = (item) => {

    const options = ["Изменить", "Удалить", "Отмена"];
    const destructiveButtonIndex = 1; //the first element in 'options' will denote the Delete option
    const cancelButtonIndex = 2; //Element number 2 in the array will be the 'Cancel' button
    const title = item.patient.fullname;
    const patientId = item.patient._id;

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
                navigation.navigate("ChangePatient", {item})
                return;

              case 1:
                removePatient(patientId);
                return;

              case 2:
                return;
              
              default: 
                console.log('Обработчик не добавлен')
           }         
       }
     )};
  
  const RemoveAppointments = async(id) => {
    const Appointments = await GetAppointments(id)
    Appointments.map((appointment) => {
      appoitmentsApi.remove(appointment._id)
    })
  } 
     
  const GetAppointments = async(id) => {
    const response = await patientsApi.show(id)
    return response.data.data.appoitments
  }  

  const removePatient = async (id) => {
    const Appointments = await GetAppointments(id)
    const isAppointments = Appointments.length > 0 ? true : false

    const alertText = isAppointments
    ? 'У данного пациента есть активные приёмы. Вы действительно хотите удалить пациента вместе с приёмами ?' 
    : 'Вы действительно хотите удалить пациента ?'

    Alert.alert(
      'удаление пациента',
      alertText
      ,
      [
        {
          text: 'Отмена',
          onPress: () => {},
          style: 'cancel',
        },
        {text:'Удалить', onPress: async () => {
          if (isAppointments) {
            await RemoveAppointments(id)
            await navigation.navigate('Home', { lastUpdate: new Date() });
          }   
          await patientsApi.remove(id).catch(e => alert(e))
          fetchPatients();
          setIsLoading(false);
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
                diagnosis: item.phone,
              }} 
              navigate = {navigation.navigate}/>}
            renderSectionHeader={({section: {title}}) => (
              <SectionTitle> {title}</SectionTitle>
    )}
        />
         <PlusButton onPress = {() => navigation.navigate('AddPatient')} />
      </>
      : <HStack space={2} justifyContent="center" marginTop = {150}>
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Загрузка
          </Heading>
      </HStack>
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