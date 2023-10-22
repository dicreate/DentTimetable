import React from 'react'
import { FlatList, Alert, LogBox, View } from 'react-native';
import styled from 'styled-components/native'
import { Appoitment, SectionTitle } from '../components';
import { useEffect, useState } from 'react';
import Icon from "react-native-vector-icons/FontAwesome"
import { useActionSheet  } from "@expo/react-native-action-sheet";
import { Input } from 'native-base';
import { Spinner, Heading, HStack } from "native-base";
import { deletePatientAppointments, isPatientAppointments, deletePatient, getPatients } from '../sqlite/requests';

const PatientsScreen = ({navigation}) => {

  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState(undefined)

  const getPatientsHandler = async () => {
    setIsLoading(true);
    const patientsTable = await getPatients();
    patientsTable.rows.length ? setPatients(patientsTable.rows._array) : setPatients('no patients');
    setIsLoading(false);
  }

  useEffect(() => { 
    getPatientsHandler()
  }, [navigation.getState().routes[1].params])

  const searchPatients = e => {
    setSearchValue(e.nativeEvent.text);
  }

  const { showActionSheetWithOptions } = useActionSheet(); 

  const openSheet = (item) => {

    const options = ["Изменить", "Удалить", "Отмена"];
    const destructiveButtonIndex = 1; //the first element in 'options' will denote the Delete option
    const cancelButtonIndex = 2; //Element number 2 in the array will be the 'Cancel' button
    const title = item.fullname;
    const patientId = item.id;

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
                deletePatientHandler(patientId)
                getPatientsHandler()
                return;
        
              case 2:
                return;
              
              default: 
                console.log('Обработчик не добавлен')
           }         
       }
     )};
  

  const deletePatientHandler = async (patientId) => {

    const isAppointments = await isPatientAppointments(patientId)
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
        {
          text:'Удалить',
          onPress: () => {     
            deletePatient(patientId)
            if (isAppointments) {
              deletePatientAppointments(patientId);
              navigation.navigate('Home', { lastUpdate: new Date() });
            }
            getPatientsHandler()
            setIsLoading(false);
        }}
      ],
      {cancelable: false},
    );
  }
    
  return (
   <Container>
    {
      patients && patients !== 'no patients'
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
            data = {patients.filter(
              item => 
                item.fullname
                .toLowerCase()
                .indexOf(searchValue.toLowerCase()) >= 0
                )}
            keyExtractor={(item, index) => index}
            onRefresh = { getPatientsHandler }
            refreshing = { isLoading }
            renderItem={({ item }) => <Appoitment 
              onLongPress = {(itemInfo) => openSheet(itemInfo)}
              item = {{
                id: item.id,
                patientId: item.id,
                fullname: item.fullname,
                diagnosis: item.phone,
                phone: item.phone,
                isSmoking: item.isSmoking,
                isPregnancy: item.isPregnancy
              }} 
              navigate = { navigation.navigate }/>}
            renderSectionHeader={({section: {title}}) => (
              <SectionTitle> {title}</SectionTitle>
    )}
        />
         
      </>
      : patients !== 'no patients' 
        ? <HStack space={2} justifyContent="center" marginTop = {150}>
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.500" fontSize="md">
              Загрузка
            </Heading>
        </HStack>
        : null
    }
 </Container>
  )
}

const SearchView = styled.View`
  margin-top: 0px;
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