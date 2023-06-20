import React, { useState } from 'react'
import { Text,  View, SafeAreaView, TextInput, StyleSheet} from 'react-native'
import { LogBox } from 'react-native';
import { Input, Stack, Button } from "native-base";
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components'
import { patientsApi } from '../utils/api';

function AddAppointmentScreen ({navigation}) {

  const [values, setValues] = useState({});

  const hangeChange = (name, e) => {
    
    const text = e.nativeEvent.text;

    setValues({
      ...values, 
      [name]: text
    });
  }

  const onSumbit = () => {
    patientsApi.add(values).then(() => {
      navigation.navigate('Home');
      console.log('okay')
    }).catch((e) => console.log(e));
  }

  return (
   <View style = {{flex: 1, marginTop: 50, }}>
      
      <Stack space={5} w="75%" maxW="300px" mx="auto">
        <Input 
          value = {values.fullname} 
          onChange = {hangeChange.bind(this, 'dentNumber')}
          autoFocus 
          inputMode = {"numeric"}
          variant="underlined" 
          size="md" 
          placeholder="Номер зуба" w="100%" 
        />

        <Input 
          value = {values.phone} 
          dataDetectorTypes = {"phoneNumber"} 
          onChange = {hangeChange.bind(this, 'diagnosis')}
          variant="underlined" 
          size="md" 
          placeholder="Диагноз" 
          w="100%" 
        />

        <Input 
          value = {values.phone} 
          dataDetectorTypes = {"phoneNumber"} 
          onChange = {hangeChange.bind(this, 'price')}
          variant="underlined" 
          inputMode = {"numeric"}
          size="md" 
          placeholder="Цена" 
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
              <Ionicons name="ios-add" size={20} color="white" />
              Добавить
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

const ButtonText = styled.Text`
  flex-direction: row;
  color: white;
  font-size: 16px;
`

export default AddAppointmentScreen