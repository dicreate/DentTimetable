import React, { useState, useEffect } from 'react'
import { Text,  View, ActivityIndicator, Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { GrayText, Button, Badge, PlusButton } from '../components'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Foundation, Fontisto, MaterialIcons } from '@expo/vector-icons'; 
import moment from 'moment/moment';
import 'moment/locale/ru';
import { getPatientAppointments } from '../sqlite/requests';
import Modal from 'react-native-modal';

const PatientScreen = ({ navigation, route }) => {

  const { item } = route.params;

  console.log(item)

  const [ appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openInfo, setOpenInfo] = useState(false);

  const getAppointments = async () => {
    const appointmentsTable = await getPatientAppointments(item.patientId);
    appointmentsTable.rows.length 
      ? setAppointments(appointmentsTable.rows._array)
      : setAppointments('no appointments')
    setIsLoading(false); 
  } 

  useEffect(() => {
    getAppointments();
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
          isVisible={openInfo}
          backdropOpacity={0.3}
        >
          <View style = {styles.centeredView}>
            <View style = {styles.modalView}>
              <CardRow>
                  <IconContainer><MaterialIcons name="smoking-rooms" size={24} color="#A3A3A3" /></IconContainer>         
                  <AppoitmentCardLabel>Курение:<Text style={{fontWeight: 'bold'}}> {item.isSmoking ? "да" : "нет"}</Text></AppoitmentCardLabel>
              </CardRow>
              <CardRow>
                  <IconContainer><MaterialIcons name="pregnant-woman" size={24} color="#A3A3A3" /></IconContainer>         
                  <AppoitmentCardLabel>Беременность:<Text style={{fontWeight: 'bold'}}> {item.isPregnancy ? "да" : "нет"}</Text></AppoitmentCardLabel>
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
   height: '100%'
 },
 modalView: {
   backgroundColor: 'white',
   borderRadius: 20,
   width: '80%',
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