import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Stack, Button } from "native-base";
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components'
import { CustomInput, CustomSwitch } from '../components/';
import { changePatient } from '../sqlite/requests';
import Modal from 'react-native-modal';

function AddPatientsScreen ({navigation, route}) {
  const { item } = route.params;

  const [openInfo, setOpenInfo] = useState(false);
  const [isSmoking, setIsSmoking] = useState(Boolean(item.isSmoking));
  const [isPregnancy, setIsPregnancy] = useState(Boolean(item.isPregnancy));

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
    changePatient(values.fullname, values.phone, item.id, isSmoking, isPregnancy);
    navigation.navigate({
      name: 'HomeScreen',
      params: { lastUpdate: new Date() },
      merge: true
    });
    navigation.navigate("Patients")
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
  gap: 10px;
`

export default AddPatientsScreen