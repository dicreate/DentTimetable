import React from 'react'
import { SectionList, Alert } from 'react-native';
import styled from 'styled-components/native'
import { Appoitment, SectionTitle } from '../components';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { appoitmentsApi, patientsApi } from '../utils/api'
import Icon from "react-native-vector-icons/FontAwesome"
import { useActionSheet  } from "@expo/react-native-action-sheet";

const HomeScreen = ({navigation}) => {

  const [appointmentsData, setAppointmentsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAppointments = async () => {
    setIsLoading(true);
    const response = await appoitmentsApi.get()
    setAppointmentsData(response.data.data)
    setIsLoading(false);
  }
  
  useEffect(() => { 
    fetchAppointments();
  }, [])

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
                removeAppointment(itemId);
                return;

              case 2:
                console.log('Отмена')
                return;
              
              default: 
                console.log('Обработчик не добавлен')
           }         
       }
     )};
   
  const removeAppointment = id => {
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
          appoitmentsApi.remove(id).then(() => {
            fetchAppointments();
          }).catch((e) => {
            console.log(e);
            setIsLoading(false);
          } )
        }}
      ],
      {cancelable: false},
    );
   
   /*  const result = appointmentsData.map(group => {
      group.data = group.data.filter(item => item._id !== id)
      return group;
    })
    setAppointmentsData(result);  */
    /* appoitmentsApi.remove(id); */
 }
    
  return (
   <Container>
    {
      appointmentsData 
      ? <>
         <SectionList
            sections={appointmentsData }
            keyExtractor={(item, index) => index}
            onRefresh={fetchAppointments}
            refreshing = {isLoading}
            renderItem={({item}) => <Appoitment onLongPress = {(itemInfo) => openSheet(itemInfo)} item = {item} navigate = {navigation.navigate}/>}
            renderSectionHeader={({section: {title}}) => (
              <SectionTitle> {title}</SectionTitle>
    )}
        />
         <PlusButton onPress = {navigation.navigate.bind(this,'AddPatient')}>
        <Ionicons name="ios-add" size={36} color="white" />
        </PlusButton>
      </>
      : null
    }
  
 
 </Container>
  )
}

const PlusButton = styled.TouchableOpacity`
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  height: 64px;
  width: 64px;
  background: #2a86ff;
  position: absolute; 
  right: 25px;
  bottom: 25px;
  shadow-opacity: 0.7;
  elevation: 4;
  shadow-color: "#2A86FF";
  shadow-radius: 3.5px;
`;

const Container = styled.View`
  flex: 1;
  background: white;
`;

export default HomeScreen