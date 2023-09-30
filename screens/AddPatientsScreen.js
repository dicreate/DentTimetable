import React, { useEffect, useState } from 'react'
import { Text,  View, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import { Modal } from 'react-native';
import { Stack, Button, HStack,} from "native-base";
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components'
import { patientsApi } from '../utils/api';
import { CustomInput, CustomSwitch } from '../components/';
import * as SQLite from 'expo-sqlite';

function AddPatientsScreen ({navigation}) {

  const db = SQLite.openDatabase('DentTimetable.db');

  const [values, setValues] = useState({
    'fullname': '',
    'phone': ''
  });
  const [openInfo, setOpenInfo] = useState(false);
  const [isSmoking, setIsSmoking] = useState(false);
  const [isPregnancy, setIsPregnancy] = useState(false);
  const [patients, setPatients] = useState(undefined)

    addPatientInfo = () => {

      db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO patients (fullname, phone, isSmoking, isPregnancy) VALUES ('${values.fullname}', '${values.phone}', ${isSmoking}, ${isPregnancy})`,
        [],
        () => {
          console.log('info added successfully')
        },
        error => {
          console.log('error on adding info ' + error.message)
        }
          )
      }) 
      navigation.navigate('Patients', { lastUpdatePatient: new Date()});
    }
  
  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM patients', null, 
      (txnObj, resultSet) => setPatients(resultSet.rows._array),
      (txnObj, error) => {console.log(error);}
      )
    })
  }, [])

  const hangeChange = (name, e) => {
    
    const text = e.nativeEvent.text;

    setValues({
      ...values, 
      [name]: text
    });
  }

  // Sqlite submit
  
 /*    onSumbit = () => {
        db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO patients (name, phone, isSmoking, isPregnancy) VALUES (?)',
        []
      )
    }) 
    } */
 

    // Submit для MongoDB
/*   const onSumbit = () => {

    patientsApi.add(values).then(() => {
      navigation.navigate('Patients', { lastUpdatePatient: new Date() } );
    }).catch(() => alert("Заполните все поля"));
  } */

  return (
   <View style = {{flex: 1, backgroundColor: openInfo ? 'rgba(0, 0, 0, 0.25)' : '#fff',}}>  
      <Stack marginTop = '50px' space={0} w="75%" maxW="300px" mx="auto">
        <CustomInput
          title = {'Имя и фамилия'}  
          value = {values.fullname} 
          onChange = {hangeChange.bind(this, 'fullname')}
          autoFocus 
          placeholder="Имя и фамилия" 
        />

        <CustomInput
          title = {'Номер телефона'}  
          value = {values.phone} 
          dataDetectorTypes = {"phoneNumber"} 
          onChange = {hangeChange.bind(this, 'phone')}
          inputMode = {"tel"}
          placeholder="Номер телефона" 
        />
        
        <ButtonView>
        <Button
          onPress={() => setOpenInfo(true)} 
          size="md"
          w="100%" 
          borderRadius={'20px'} 
          colorScheme="blue" 
          >
          <ButtonText>
              Дополнительная информация
          </ButtonText>  
        </Button>
          <Button
          onPress={() => addPatientInfo()} 
          size="md"
          w="100%" 
          borderRadius={'20px'} 
          colorScheme="green" 
          >
            <ButtonText>
              <Ionicons name="ios-add" size={20} color="white" />
              Добавить
            </ButtonText>  
          </Button>
        </ButtonView>
      </Stack>
      <Modal
          animationType='slide'
          transparent={true}
          visible={openInfo}
        >
          <View style = {styles.centeredView}>
            <View style = {styles.modalView}>
              <CustomSwitch title={'Курение'} state = {isSmoking} setState={setIsSmoking}/>
              <CustomSwitch title={'Беременность'} state = {isPregnancy} setState={setIsPregnancy}/>
              <TouchableOpacity onPress={() => {
                  setOpenInfo(false)   
                }}>
                  <Text>Закрыть</Text>
              </TouchableOpacity>
            </View>
         </View>
      </Modal>
   </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
   alignItems: 'center',
   justifyContent: 'center',
   height: '100%'
 },
 modalView: {
   backgroundColor: 'white',
   borderRadius: 20,
   width: '80%',
   maxWidth: 400,
   padding: 35,
   alignItems: 'center',
   shadowColor: '#000',
   shadowOffset: {
     width: 0,
     height: 2,
   },
   shadowOpacity: 0.25, 
   shadowRadius: 4,
   elevation: 5,
 }
})

const ButtonView = styled.View`
  margin-top: 30px;
  gap: 30px;
`

const ButtonText = styled.Text`
  flex-direction: row;
  color: white;
  font-size: 16px;
`

export default AddPatientsScreen