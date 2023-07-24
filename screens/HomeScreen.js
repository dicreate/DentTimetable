import React from 'react'
import { SectionList, Alert, LogBox, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native'
import { Appoitment, SectionTitle, PlusButton } from '../components';
import { useEffect, useState } from 'react';
import { appoitmentsApi } from '../utils/api'
import Icon from "react-native-vector-icons/FontAwesome"
import { useActionSheet  } from "@expo/react-native-action-sheet";
import { Spinner, Heading, HStack } from "native-base";

const HomeScreen = ({navigation}) => {

  const [appointmentsData, setAppointmentsData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchAppointments = async () => {
    setIsLoading(true);
    const response = await appoitmentsApi.get().catch(() => {
      alert('Error connection. Please, connect to internet and restart app')
    })
    setAppointmentsData(response.data.data)
    setIsLoading(false);
  }
  
  useEffect(() => { 
    fetchAppointments();
  }, [navigation.getState().routes[0].params])

  const { showActionSheetWithOptions } = useActionSheet();

  const openSheet = (item) => {

    const options = ["Изменить", "Удалить", "Отмена"];
    const destructiveButtonIndex = 1; //the first element in 'options' will denote the Delete option
    const cancelButtonIndex = 2; //Element number 2 in the array will be the 'Cancel' button
    const title = item.patient.fullname + ' - ' + item.time;

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
                navigation.navigate('ChangeAppointment', {
                  item,
                });
                return;

              case 1:
                removeAppointment(item._id);
                return;

              case 2:
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
         <PlusButton onPress = {() => navigation.navigate('AddPatient')} />
      </>
      : <HStack space={2} justifyContent="center" marginTop = {150}>
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
      </HStack>
    }
  
 
 </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background: white;
`;

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state. Check:',
]);

export default HomeScreen