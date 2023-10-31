import React, { useEffect, useState } from 'react'
import { Text,  View, StyleSheet, TouchableOpacity, Switch, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native'
import { Stack, Button, HStack,} from "native-base";
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components'
import { CustomInput, CustomSwitch } from '../components/';
import { addPatients, addPatientsInfo } from '../sqlite/requests';
import Modal from 'react-native-modal';

function AddPatientsScreen ({navigation}) {

  const [values, setValues] = useState({
    'fullname': '',
    'phone': '',
    'cardiovascularSystem': '',
    'nervousSystem': '',
  });

  const WindowWidth = Dimensions.get('window').width;  

  const [openInfo, setOpenInfo] = useState(false);

  const [isCardiovascularSystem, setIsCardiovascularSystem] = useState(false);
  const [isNervousSystem, setIsNervousSystem] = useState(false);
  const [isEndocrineSystem, setIsEndocrineSystem] = useState(false);
  const [isDigestive, setIsDigestive] = useState(false);
  const [isRespiratory, setIsRespiratory] = useState(false);
  const [isInfectious, setIsInfectious] = useState(false);
  const [isAllergic, setIsAllergic] = useState(false);
  const [isConstantMedicines, setIsConstantMedicines] = useState(false);
  const [isHarmfulFactors, setIsHarmfulFactors] = useState(false);
  const [isPregnancy, setIsPregnancy] = useState(false);
  const [isAlcohol, setIsAlcohol] = useState(false);
  const [isSmoking, setIsSmoking] = useState(false);
  const [isOther, setIsOther] = useState(false);

    addPatientHandler = async () => {
      if (values.fullname !== '') {
        const insertId = await addPatients(values.fullname, values.phone);
        await addPatientsInfo(insertId, isCardiovascularSystem, isNervousSystem, isEndocrineSystem, isDigestive, isRespiratory,isInfectious, isAllergic, isConstantMedicines, isHarmfulFactors, isPregnancy, isAlcohol, isSmoking, isOther, values.cardiovascularSystem, values.nervousSystem);
        navigation.navigate('Patients', { lastUpdatePatient: new Date()});
        setValues({
          ['fullname']: '',
          ['phone']: '',
        });
        setIsCardiovascularSystem(false);
        setIsNervousSystem(false);
        setIsEndocrineSystem(false);
        setIsDigestive(false);
        setIsRespiratory(false);
        setIsInfectious(false);
        setIsAllergic(false);
        setIsConstantMedicines(false);
        setIsHarmfulFactors(false);
        setIsPregnancy(false);
        setIsAlcohol(false);
        setIsSmoking(false);
        setIsOther(false);
      }
      else alert('Имя пациента не должно быть пустым')
    }

  const handleChange = (name, e) => {
    
    const text = e.nativeEvent.text;

    setValues({
      ...values, 
      [name]: text
    });
  }

  return (
    <ScrollView>
   <Container>  
      <Wrapper>
        <Stack space={0} w = {WindowWidth*0.8} maxW="300px" mx="auto" my="auto">
          <CustomInput
            title = {'Имя и фамилия'}  
            value = {values.fullname} 
            onChange = {handleChange.bind(this, 'fullname')}
            placeholder="Имя и фамилия" 
          />

          <CustomInput
            title = {'Номер телефона'}  
            value = {values.phone} 
            dataDetectorTypes = {"phoneNumber"} 
            onChange = {handleChange.bind(this, 'phone')}
            inputMode = {"tel"}
            placeholder="Номер телефона" 
          />

          <CustomSwitch style={{marginTop: 20}} title={'Заболевания сердечно-сосудистой системы'} state = {isCardiovascularSystem} setState={setIsCardiovascularSystem} handleChange = {handleChange} name = 'cardiovascularSystem' />

          <CustomSwitch title={'Заболевания нервной системы'} state = {isNervousSystem} setState={setIsNervousSystem} handleChange = {handleChange} name = 'nervousSystem' />
        {/*   <CustomSwitch title={'Заболевания эндокринной системы'} state = {isEndocrineSystem} setState={setIsEndocrineSystem}/>
          <CustomSwitch title={'Заболевания органов пищеварения'} state = {isDigestive} setState={setIsDigestive}/>
          <CustomSwitch title={'Заболевания органов дыхания'} state = {isRespiratory} setState={setIsRespiratory}/>
          <CustomSwitch title={'Инфекционные заболевания'} state = {isInfectious} setState={setIsInfectious}/>
          <CustomSwitch title={'Аллергические реакции'} state = {isAllergic} setState={setIsAllergic}/>
          <CustomSwitch title={'Постоянное применение лекарственных средств'} state = {isConstantMedicines} setState={setIsConstantMedicines}/>
          <CustomSwitch title={'Вредные факторы производственной среды'} state = {isHarmfulFactors} setState={setIsHarmfulFactors}/>
          <CustomSwitch title={'Беременность, послеродовый период'} state = {isPregnancy} setState={setIsPregnancy}/>
          <CustomSwitch title={'Алкогольная зависимость'} state = {isAlcohol} setState={setIsAlcohol}/>
          <CustomSwitch title={'Курение'} state = {isSmoking} setState={setIsSmoking}/>
          <CustomSwitch title={'Другое'} state = {isOther} setState={setIsOther}/> */}
 
          
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
   </ScrollView>
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
  margin-top: 20px;
`

const ButtonView = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
  gap: 30px;
`

const ButtonText = styled.Text`
  flex-direction: row;
  color: white;
  font-size: 16px;
`

export default AddPatientsScreen