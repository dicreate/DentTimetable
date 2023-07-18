import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Input, Stack, Button } from "native-base";
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components'
import { patientsApi } from '../utils/api';
import { CommonActions } from '@react-navigation/native';

function AddPatientsScreen ({navigation, route}) {

  const { item } = route.params;

  const [values, setValues] = useState({
    'fullname': item.patient.fullname,
    'phone': item.patient.phone
  });

  const hangeChange = (name, e) => {
    
    const text = e.nativeEvent.text;

    setValues({
      ...values, 
      [name]: text
    });
  }

  const onSumbit = () => {
    patientsApi.change(item.patient._id, values)
    .then(() => {
      navigation.dispatch({
        ...CommonActions.setParams({ lastUpdatePatient: new Date() }),
        source: navigation.getState().routes[0].key,
      });
      navigation.navigate('Patients', { lastUpdatePatient: new Date() });
    })
    .catch(() => alert("Минимальное количество символов для полей 4"));
  }

  return (
   <View style = {{flex: 1, marginTop: 50, }}>
      
      <Stack space={5} w="75%" maxW="300px" mx="auto">
        <Input 
          value = {values.fullname} 
          onChange = {hangeChange.bind(this, 'fullname')}
          autoFocus 
          variant="underlined" 
          size="md" 
          placeholder="Имя и фамилия" w="100%" 
        />

        <Input 
          value = {values.phone} 
          dataDetectorTypes = {"phoneNumber"} 
          onChange = {hangeChange.bind(this, 'phone')}
          inputMode = {"tel"}
          variant="underlined" 
          size="md" 
          placeholder="Номер телефона" 
          w="100%" 
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