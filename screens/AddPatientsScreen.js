import React, { useState } from 'react'
import { Text,  View, SafeAreaView, TextInput, StyleSheet} from 'react-native'
import { LogBox } from 'react-native';
import { Input, Stack, Button } from "native-base";
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components'
import { patientsApi } from '../utils/api';

function AddPatientsScreen ({navigation}) {

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

LogBox.ignoreLogs([
   'Non-serializable values were found in the navigation state',
   'This synthetic event is reused for performance reasons'
 ]);

export default AddPatientsScreen