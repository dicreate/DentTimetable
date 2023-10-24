import React, { useEffect, useState } from 'react'
import { Text,  View, StyleSheet, TouchableOpacity, Switch, KeyboardAvoidingView } from 'react-native'
import { Stack, Button, HStack,} from "native-base";
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components'
import { CustomInput, CustomSwitch } from '../components/';
import { addPatients, addPatientsInfo } from '../sqlite/requests';
import Modal from 'react-native-modal';

function AddPatientsScreen ({navigation}) {

  const [values, setValues] = useState({
    'fullname': '',
    'phone': ''
  });


  const [openInfo, setOpenInfo] = useState(false);
  const [isSmoking, setIsSmoking] = useState(false);
  const [isPregnancy, setIsPregnancy] = useState(false);

    addPatientHandler = async () => {
      if (values.fullname !== '') {
        const insertId = await addPatients(values.fullname, values.phone);
        await addPatientsInfo(insertId, isSmoking, isPregnancy);
        navigation.navigate('Patients', { lastUpdatePatient: new Date()});
        setValues({
          ['fullname']: '',
          ['phone']: '',
        });
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
   <Container>  
      <Wrapper>
        <Stack space={0} w="75%" maxW="300px" mx="auto">
          <CustomInput
            title = {'Имя и фамилия'}  
            value = {values.fullname} 
            onChange = {hangeChange.bind(this, 'fullname')}
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

          <CustomSwitch title={'Курение'} state = {isSmoking} setState={setIsSmoking}/>
          <CustomSwitch title={'Беременность'} state = {isPregnancy} setState={setIsPregnancy}/>
          
          <ButtonView>
          {/*   <Button
              onPress={() => setOpenInfo(true)} 
              size="md"
              w="100%" 
              borderRadius={'20px'} 
              colorScheme="blue" 
              >
              <ButtonText>
                  Дополнительная информация
              </ButtonText>  
            </Button> */}
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
{/*         <Modal
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
        </Modal>      */}  
      </Wrapper>
   </Container>
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


const Container = styled.View`
  flex: 1; 
  background-color: #fff;
`

const Wrapper= styled.View`
  margin-top: 100px;
`

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