import React, { useEffect, useState } from 'react'
import { Text,  View, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import { Stack, Button, HStack,} from "native-base";
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components'
import { CustomInput, CustomSwitch } from '../components/';
import { addPatients } from '../sqlite/requests';
import Modal from 'react-native-modal';

function AddPatientsScreen ({navigation}) {

  const [values, setValues] = useState({
    'fullname': '',
    'phone': ''
  });
  const [openInfo, setOpenInfo] = useState(false);
  const [isSmoking, setIsSmoking] = useState(false);
  const [isPregnancy, setIsPregnancy] = useState(false);

    addPatientHandler = () => {
      if (values.fullname !== '') {
        addPatients(values.fullname, values.phone, isSmoking, isPregnancy);
        navigation.navigate('Patients', { lastUpdatePatient: new Date()});
      }
      else alert('Имя пациента не должно быть пустым')
    }

  const hangeChange = (name, e) => {
    
    const text = e.nativeEvent.text;

    setValues({
      ...values, 
      [name]: text
    });
  }

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
          onPress={() => addPatientHandler()} 
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
          isVisible={openInfo}
          backdropOpacity={0.3}
          onBackButtonPress = {() => {
            setOpenInfo(false)   
          }}
        >
          <View style = {styles.centeredView}>
            <View style = {styles.modalView}>
              <CustomSwitch title={'Курение'} state = {isSmoking} setState={setIsSmoking}/>
              <CustomSwitch title={'Беременность'} state = {isPregnancy} setState={setIsPregnancy}/>
              <TouchableOpacity style = {{marginTop: 10}} onPress={() => {
                  setOpenInfo(false)   
                }}>
                  <Text>Выбрать</Text>
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