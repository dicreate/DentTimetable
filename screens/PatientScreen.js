import React, { useState, useEffect } from 'react'
import { Text,  View, ActivityIndicator, Linking } from 'react-native'
import styled from 'styled-components'
import { GrayText, Button, Badge, PlusButton } from '../components'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons'; 
import moment from 'moment/moment';
import 'moment/locale/ru';
import { getPatientAppointments } from '../sqlite/requests';

const PatientScreen = ({ navigation, route }) => {

  const { item } = route.params;

  const [ appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    <View style = {{flex: 1}}>
        <PatientDetails>
          <PatientFullName>{item.fullname}</PatientFullName>
          <GrayText>{item.diagnosis}</GrayText>
          <PattientButtons>
            <FormulaButtonView><FormulaButton>Формула зубов</FormulaButton></FormulaButtonView>
            <PhoneButtonView ><PhoneButton onPress = {() => Linking.openURL('tel:' + item.phone)} color="#84D269"><Foundation name="telephone" size={22} color="white" />
            </PhoneButton></PhoneButtonView>
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
                <AppoitmentCardRow>
                  <IconContainer><MaterialCommunityIcons name="tooth-outline" size={24} color="#A3A3A3" /></IconContainer>
                  <AppoitmentCardLabel>Зуб:<Text style={{fontWeight: 'bold'}}> {appointment.toothNumber ? appointment.toothNumber : 'не указан'}</Text></AppoitmentCardLabel>
                </AppoitmentCardRow>
                <AppoitmentCardRow>
                  <IconContainer><Foundation name="clipboard-notes" size={24} color="#A3A3A3" /></IconContainer>
                  <AppoitmentCardLabel>Диагноз:<Text style={{fontWeight: 'bold'}}> {appointment.diagnosis ? appointment.diagnosis : 'не указан'}</Text></AppoitmentCardLabel>
                </AppoitmentCardRow>
                <AppoitmentCardRow>
                  <IconContainer><Fontisto name="injection-syringe" size={24} color="#A3A3A3" /></IconContainer>         
                  <AppoitmentCardLabel>Анестезия:<Text style={{fontWeight: 'bold'}}> {appointment.anesthetization ? 'Да' : 'Нет'}</Text></AppoitmentCardLabel>
                </AppoitmentCardRow>  
                <AppoitmentCardRow 
                style = {{ marginTop: 15, justifyContent: 'space-between' }}
                >
                  <Badge style = {{ width: 155, marginLeft: 0 }} active>{moment(appointment.date).locale('ru').format('DD.MM.YYYY')} - {appointment.time}</Badge>
                  <Badge color='green'>{appointment.price}</Badge>    
                </AppoitmentCardRow>   
              </AppoitmentCard>)
              : null 
          }
        </Container>
      </PatientAppoitments>
      <PlusButton onPress = {() => navigation.navigate('AddAppointment', {
        patientId: item.id
      })}/>
      </View>
  )
}

const IconContainer = styled.View`
width: 28px;
align-items: center;
`

const AppoitmentCardRow = styled.View`
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
  flex: 0.3;
  background-color: #fff;
`;


const PatientAppoitments = styled.View`
  flex: 1;
  background: #f8fafd;
`;

const FormulaButtonView = styled.View`
  flex: 1;
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

const FormulaButton = styled(Button)`
  align-self: stretch;
`;

const PattientButtons = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`

const PatientFullName = styled.Text`
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 3px;
`;

export default PatientScreen