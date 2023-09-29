import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Input, Stack, Button } from "native-base";
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components'
import { patientsApi } from '../utils/api';
import { CommonActions } from '@react-navigation/native';
import CustomInput from '../components/CustomInput';
import * as SQLite from 'expo-sqlite';

function AddPatientsScreen ({navigation, route}) {

  const { item } = route.params;
  const db = SQLite.openDatabase('DentTimetable.db');

  const [values, setValues] = useState({
    'fullname': item.fullname,
    'phone': item.phone
  });

  const hangeChange = (name, e) => {
    
    const text = e.nativeEvent.text;

    setValues({
      ...values, 
      [name]: text
    });
  }


  const onSumbit = () => {
    db.transaction(txn => {
      txn.executeSql(
        `UPDATE patients 
        SET fullname = '${values.fullname}', phone = '${values.phone}'
        WHERE id = ${item.id}
        `,
        [],
        () => {
          console.log('info added successfully')
        },
        error => {
          console.log('error on adding info ' + error.message)
        }
          )
      }) 
      navigation.navigate('Patients', { lastUpdatePatient: new Date() });
  }

  return (
   <View style = {{flex: 1, backgroundColor: '#fff'}}>
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
          onPress={() => onSumbit()} 
          size="md"
          w="100%" 
          borderRadius={'20px'} 
          colorScheme="green" 
          > 
            <ButtonText>
              <Ionicons name="pencil-outline" size={20} color="white" />
              <Text style={{color: 'white'}}>Изменить</Text>
            </ButtonText>  
          </Button>
        </ButtonView>
      </Stack>
   </View>
  )
}

const ButtonView = styled.View`
  margin-top: 30px;
`

const ButtonText = styled.View`
  flex-direction: row;
  color: white;
  font-size: 16px;
  gap: 10px;
`

export default AddPatientsScreen