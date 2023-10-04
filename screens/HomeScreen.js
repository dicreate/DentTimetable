import React from 'react'
import { SectionList, Alert, LogBox, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native'
import { Appoitment, SectionTitle, PlusButton } from '../components';
import { useEffect, useState } from 'react';
import Icon from "react-native-vector-icons/FontAwesome"
import { useActionSheet  } from "@expo/react-native-action-sheet";
import { Spinner, Heading, HStack } from "native-base";
import moment from 'moment/moment';
import 'moment/locale/ru';
import { reduce, groupBy } from 'lodash';
import { getAppointmentsWithPatients } from '../sqlite/requests';

const HomeScreen = ({navigation}) => {

  const [appointments, setAppointments] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getAppointments = async () => {
    setIsLoading(true);
    const appointmentsTable = await getAppointmentsWithPatients();
    appointmentsTable.rows.length 
      ? setAppointments(
        reduce(groupBy(appointmentsTable.rows._array, 'date'), (result, value, key) => {
          result = [...result, {title: key, data: value}];
          return result;
      },[])
        )
      : setAppointments('no appointments')
    setIsLoading(false); 
  } 
 
  useEffect(() => {
    getAppointments(); 
  }, [navigation.getState().routes[0].params])

  const { showActionSheetWithOptions } = useActionSheet();

  const openSheet = (item) => {

    const options = ["Изменить", "Удалить", "Отмена"];
    const destructiveButtonIndex = 1; //the first element in 'options' will denote the Delete option
    const cancelButtonIndex = 2; //Element number 2 in the array will be the 'Cancel' button
    const title = item.fullname + ' - ' + item.time;
    console.log(item)
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
                db.transaction(txn => {
                  txn.executeSql(`DELETE FROM appointments WHERE id=${item.id};`,
                  [],
                  () => {
                    console.log('appointment deleted successfully')
                  },
                  error => {
                    console.log('error on deleting appointment' + error.message)
                  })
                })
                getAppointments()
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
      appointments && appointments !== 'no appointments'
      ? <>
         <SectionList
            sections = {appointments}
            keyExtractor = {(item, index) => index}
            onRefresh = {getAppointments}
            refreshing = {isLoading}
            renderItem = { ({item}) => <Appoitment 
              onLongPress = {(itemInfo) => openSheet(itemInfo)} 
              item = {item} 
              navigate = {navigation.navigate}
              /> }
            renderSectionHeader = {({section: {title}}) => (
              <SectionTitle> {moment(title).locale('ru').format('DD.MM.YY, dd')} </SectionTitle>
    )}
        />
      </>
      : appointments !== 'no appointments' 
        ? <HStack space={2} justifyContent="center" marginTop = {150}>
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.500" fontSize="md">
              Загрузка
            </Heading>
        </HStack>
        : null
    }
    <PlusButton onPress = {() => navigation.navigate('AddPatient')} />
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