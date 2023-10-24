import React, { useState, useEffect } from 'react'
import { Text,  View, ActivityIndicator, Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { GrayText, Button, Badge, PlusButton } from '../components'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Foundation, Fontisto, MaterialIcons } from '@expo/vector-icons'; 
import moment from 'moment/moment';
import 'moment/locale/ru';
import { getPatientAppointments, getPatientInfo, showPatientsInfo } from '../sqlite/requests';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';

const PatientScreen = ({ navigation, route }) => {

  const { item } = route.params;

  const [ appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [patientInfo, setPatientInfo] = useState([]);
  const [openInfo, setOpenInfo] = useState(false);


  const getAppointments = async () => {
    const appointmentsTable = await getPatientAppointments(item.patientId);
    appointmentsTable.rows.length 
      ? setAppointments(appointmentsTable.rows._array)
      : setAppointments('no appointments')
    setIsLoading(false); 
  } 

  const getPatientInfoHandler = async () => {
    const patientInfoTable = await getPatientInfo(item.patientId);
    patientInfoTable.rows.length 
    ?  setPatientInfo(patientInfoTable.rows._array[0])
    :  setPatientInfo('no info')
  }

  useEffect(() => {
    getAppointments();
    getPatientInfoHandler();
  }, [])
  
  return (
    <View style = {{flex: 1, backgroundColor: '#f8fafd'}}>
      <ScrollView>
        <PatientDetails>
          <PatientContacts>
            <PhoneButtonView>
              <PhoneButton 
                onPress = {() => Linking.openURL('tel:' + item.phone)} 
                color="#84D269">
                  <Foundation 
                    name="telephone" 
                    size={22} 
                    color="white" 
                  />
              </PhoneButton>
            </PhoneButtonView>
            <View>
              <PatientFullName>{item.fullname}</PatientFullName>
              <GrayText>{item.diagnosis}</GrayText>
            </View>
          </PatientContacts>
          <PattientButtons>
            <ButtonView>
              <Button
                onPress = {() => navigation.navigate('Formula', {
                patientId: item.patientId
              })}>
                Формула зубов
              </Button>
              <Button
                onPress = {() => setOpenInfo(true)}>
                Информация
              </Button>
            </ButtonView>

          </PattientButtons>  
      </PatientDetails>

      <PatientAppoitments>
        <Container>
          { 
            isLoading 
            ? <ActivityIndicator size="large" color="#2A86FF"/> 
            : appointments !== 'no appointments'
              ? appointments.map((appointment) => 
                <AppoitmentCard key = {appointment.id}>
                <CardRow>
                  <IconContainer><MaterialCommunityIcons name="tooth-outline" size={24} color="#A3A3A3" /></IconContainer>
                  <AppoitmentCardLabel>Зуб:<Text style={{fontWeight: 'bold'}}> {appointment.toothNumber ? appointment.toothNumber : 'не указан'}</Text></AppoitmentCardLabel>
                </CardRow>
                <CardRow>
                  <IconContainer><Foundation name="clipboard-notes" size={24} color="#A3A3A3" /></IconContainer>
                  <AppoitmentCardLabel>Диагноз:<Text style={{fontWeight: 'bold'}}> {appointment.diagnosis ? appointment.diagnosis : 'не указан'}</Text></AppoitmentCardLabel>
                </CardRow>
                <CardRow>
                  <IconContainer><Fontisto name="injection-syringe" size={24} color="#A3A3A3" /></IconContainer>         
                  <AppoitmentCardLabel>Анестезия:<Text style={{fontWeight: 'bold'}}> {appointment.anesthetization ? 'Да' : 'Нет'}</Text></AppoitmentCardLabel>
                </CardRow>  
                <CardRow 
                style = {{ marginTop: 15, justifyContent: 'space-between' }}
                >
                  <Badge style = {{ width: 155, marginLeft: 0 }} active>{moment(appointment.date).locale('ru').format('DD.MM.YYYY')} - {appointment.time}</Badge>
                  <Badge color='green'>{appointment.price}</Badge>    
                </CardRow>   
              </AppoitmentCard>)
              : null 
          }
        </Container>
      </PatientAppoitments>
      </ScrollView>
      <PlusButton onPress = {() => navigation.navigate('AddAppointment', {
        patientId: item.id
      })}/>
      <Modal
          isVisible = {openInfo}
          backdropOpacity = {0.3}
          onBackButtonPress = {() => {
            setOpenInfo(false)   
          }}
        >

      {/*     <CustomSwitch style={{marginTop: 20}} title={'Заболевания сердечно-сосудистой системы'} state = {isCardiovascularSystem} setState={setIsCardiovascularSystem}/>
          <CustomSwitch title={'Заболевания нервной системы'} state = {isNervousSystem} setState={setIsNervousSystem}/>
          <CustomSwitch title={'Заболевания эндокринной системы'} state = {isEndocrineSystem} setState={setIsEndocrineSystem}/>
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

          <View style = {styles.centeredView}>
            <View style = {styles.modalView}>
              <CardRow>
                  <IconContainer><MaterialIcons name="smoking-rooms" size={24} color="#A3A3A3" /></IconContainer>         
                  <AppoitmentCardLabel>Заболевания сердечно-сосудистой системы: <Text style={{fontWeight: 'bold'}}>{patientInfo.isCardiovascularSystem ? 'Да' : 'Нет'}</Text></AppoitmentCardLabel>
              </CardRow>
              <CardRow>
                  <IconContainer><MaterialIcons name="pregnant-woman" size={24} color="#A3A3A3" /></IconContainer>         
                  <AppoitmentCardLabel>Заболевания нервной системы: <Text style={{fontWeight: 'bold'}}>{patientInfo.isNervousSystem ? 'Да' : 'Нет'}</Text></AppoitmentCardLabel>
              </CardRow>
              <CardRow>
                  <IconContainer><MaterialIcons name="smoking-rooms" size={24} color="#A3A3A3" /></IconContainer>         
                  <AppoitmentCardLabel>Заболевания эндокринной системы: <Text style={{fontWeight: 'bold'}}>{patientInfo.isEndocrineSystem ? 'Да' : 'Нет'}</Text></AppoitmentCardLabel>
              </CardRow>
              <CardRow>
                  <IconContainer><MaterialIcons name="pregnant-woman" size={24} color="#A3A3A3" /></IconContainer>         
                  <AppoitmentCardLabel>Заболевания органов пищеварения: <Text style={{fontWeight: 'bold'}}>{patientInfo.isDigestive ? 'Да' : 'Нет'}</Text></AppoitmentCardLabel>
              </CardRow>  
              <CardRow>
                  <IconContainer><MaterialIcons name="smoking-rooms" size={24} color="#A3A3A3" /></IconContainer>         
                  <AppoitmentCardLabel>Заболевания органов дыхания: <Text style={{fontWeight: 'bold'}}>{patientInfo.isRespiratory ? 'Да' : 'Нет'}</Text></AppoitmentCardLabel>
              </CardRow>
              <CardRow>
                  <IconContainer><MaterialIcons name="pregnant-woman" size={24} color="#A3A3A3" /></IconContainer>         
                  <AppoitmentCardLabel>Инфекционные заболевания: <Text style={{fontWeight: 'bold'}}>{patientInfo.isInfectious ? 'Да' : 'Нет'}</Text></AppoitmentCardLabel>
              </CardRow>  
              <CardRow>
                  <IconContainer><MaterialIcons name="smoking-rooms" size={24} color="#A3A3A3" /></IconContainer>         
                  <AppoitmentCardLabel>Аллергические реакции: <Text style={{fontWeight: 'bold'}}>{patientInfo.isAllergic ? 'Да' : 'Нет'}</Text></AppoitmentCardLabel>
              </CardRow>
              <CardRow>
                  <IconContainer><MaterialIcons name="pregnant-woman" size={24} color="#A3A3A3" /></IconContainer>         
                  <AppoitmentCardLabel>Постоянное применение лекарственных средств: <Text style={{fontWeight: 'bold'}}>{patientInfo.isConstantMedicines ? 'Да' : 'Нет'}</Text></AppoitmentCardLabel>
              </CardRow>  
              <CardRow>
                  <IconContainer><MaterialIcons name="smoking-rooms" size={24} color="#A3A3A3" /></IconContainer>         
                  <AppoitmentCardLabel>Вредные факторы производственной среды: <Text style={{fontWeight: 'bold'}}>{patientInfo.isHarmfulFactors ? 'Да' : 'Нет'}</Text></AppoitmentCardLabel>
              </CardRow>
              <CardRow>
                  <IconContainer><MaterialIcons name="pregnant-woman" size={24} color="#A3A3A3" /></IconContainer>         
                  <AppoitmentCardLabel>Беременность, послеродовый период: <Text style={{fontWeight: 'bold'}}>{patientInfo.isPregnancy ? 'Да' : 'Нет'}</Text></AppoitmentCardLabel>
              </CardRow>  
              <CardRow>
                  <IconContainer><MaterialIcons name="smoking-rooms" size={24} color="#A3A3A3" /></IconContainer>         
                  <AppoitmentCardLabel>Алкогольная зависимость: <Text style={{fontWeight: 'bold'}}>{patientInfo.isAlcohol ? 'Да' : 'Нет'}</Text></AppoitmentCardLabel>
              </CardRow>
              <CardRow>
                  <IconContainer><MaterialIcons name="pregnant-woman" size={24} color="#A3A3A3" /></IconContainer>         
                  <AppoitmentCardLabel>Курение: <Text style={{fontWeight: 'bold'}}>{patientInfo.isSmoking ? 'Да' : 'Нет'}</Text></AppoitmentCardLabel>
              </CardRow>
              <CardRow>
                  <IconContainer><MaterialIcons name="pregnant-woman" size={24} color="#A3A3A3" /></IconContainer>         
                  <AppoitmentCardLabel>Другое: <Text style={{fontWeight: 'bold'}}>{patientInfo.isOther ? 'Да' : 'Нет'}</Text></AppoitmentCardLabel>
              </CardRow>      
              <TouchableOpacity style = {{marginTop: 10, alignSelf: "center"}} onPress={() => {
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
   height: '100%',
 },
 modalView: {
   backgroundColor: 'white',
   borderRadius: 20,
   width: '100%',
   maxWidth: 400,
   padding: 35,
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

const PatientContacts = styled.View`
  display: flex;
  flex-direction: row;
  gap: 20px;
`

const IconContainer = styled.View`
  width: 28px;
  align-items: center;
`

const CardRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin-top: 3.5px;
  margin-bottom: 3.5px;
`;

const AppoitmentCardLabel = styled.Text`
  font-size: 16px;
`

const AppoitmentCard = styled.View`
  shadow-opacity: 0.7;
  elevation: 1;
  shadow-color: black;
  shadow-radius: 10px;
  padding: 20px 25px;
  border-radius: 10px;
  background: white;
  margin-bottom: 20px;
`;
/* shadow-offset: {
  height: 2px;
} */
const Container = styled.View`
  padding: 25px;

`;

const PatientDetails = styled(Container)`
  flex: 0.4;
  background-color: #fff;
`;


const PatientAppoitments = styled.View`
  flex: 1;
`;

const ButtonView = styled.View`
  flex: 1;
  gap: 20px;
`

const PhoneButtonView = styled.View`
  margin-left: 10px;
  width: 45px;
`

const PhoneButton = styled(Button)`
  background: #84d269;
  height: 45px;
  width: 45px;
`

const PattientButtons = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  flex: 1;
`

const PatientFullName = styled.Text`
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 3px;
`;

export default PatientScreen