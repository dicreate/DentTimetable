import React from 'react'
import { SectionList, Alert, LogBox, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native'
import { Appoitment, SectionTitle, PlusButton } from '../components';
import { useEffect, useState } from 'react';
import { appoitmentsApi } from '../utils/api'
import Icon from "react-native-vector-icons/FontAwesome"
import { useActionSheet  } from "@expo/react-native-action-sheet";
import { Spinner, Heading, HStack } from "native-base";
import moment from 'moment/moment';
import 'moment/locale/ru';
import * as SQLite from 'expo-sqlite';
import { reduce, groupBy } from 'lodash';
import { showAppointments } from '../sqlite/requests';

const HomeScreen = ({navigation}) => {

  const db = SQLite.openDatabase('DentTimetable.db');

  const [appointmentsData, setAppointmentsData] = useState();
  const [appointments, setAppointments] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const DATA = [
    {
      title: '2023-08-22',
      data: [
        { 
        "_id": "64e489aaa397778f44b9330d", 
        "createdAt": "2023-08-22T10:10:50.868Z", 
        "date": "2023-08-22", 
        "dentNumber": 1, 
        "diagnosis": "Осмотр ",
        "fullname": "Карина", 
        "patient": 
          {"__v": 
          0, 
          "_id": "64bada7ffc0bdabc31304708", 
          "createdAt": "2023-07-21T19:20:31.812Z", 
          "fullname": "Карина", 
          "phone": "+375298878221", 
          "updatedAt": "2023-08-22T10:09:59.961Z"}, 
          "price": 0, 
          "time": "14:00", 
          "updatedAt": "2023-08-26T10:45:23.353Z"
        }, 
        {
          "__v": 0, 
          "_id": "64e489e0a397778f44b93317", 
          "createdAt": "2023-08-22T10:11:44.707Z", 
          "date": "2023-08-22", 
          "dentNumber": 5, 
          "diagnosis": "Санация ", 
          "fullname": "Дима", 
          "patient": 
            {"__v": 0, 
            "_id": "64ba614e0fa3227e485802a8", 
            "createdAt": "2023-07-21T10:43:26.924Z", 
            "fullname": "Дима", 
            "phone": "+375295143602", 
            "updatedAt": "2023-09-05T13:23:05.451Z"
          }, 
          "price": 1500, 
          "time": "17:00", 
          "updatedAt": "2023-08-22T10:11:44.707Z"
        }]
    }, 
  ]

  const GetAppointments = async () => {
    setIsLoading(true);
      db.transaction(txn => {
        txn.executeSql('SELECT * FROM patients JOIN appointments WHERE appointments.patientId = patients.id', null, 
        (txnObj, resultSet) => resultSet.rows.length ? setAppointments(
          reduce(groupBy(resultSet.rows._array, 'date'), (result, value, key) => {
            result = [...result, {title: key, data: value}];
            return result;
         },[])
          )
          : setAppointments('no appointments'),
        (txnObj, error) => {console.log(error);}
        )
      })
    setIsLoading(false);
  }

  const fetchAppointments = async () => {
    setIsLoading(true);
    const response = await appoitmentsApi.get().catch(() => {
      alert('Ошибка подключения. Пожалуйста, включите интернет и перезагрузите приложение')
    })
    setAppointmentsData(response.data.data)
    setIsLoading(false);
  } 

  useEffect(() => {
    GetAppointments(); 
    /* fetchAppointments(); */
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
                GetAppointments()
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
            sections={appointments}
            keyExtractor={(item, index) => index}
            onRefresh={GetAppointments}
            refreshing = {isLoading}
            renderItem={({item}) => <Appoitment onLongPress = {(itemInfo) => openSheet(itemInfo)} item = {item} navigate = {navigation.navigate}/>}
            renderSectionHeader={({section: {title}}) => (
              <SectionTitle> {moment(title).locale('ru').format('DD.MM.YY, dd')}</SectionTitle>
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