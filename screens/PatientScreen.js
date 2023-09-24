import React, { useState, useEffect } from 'react'
import { Text,  View, ActivityIndicator, Linking } from 'react-native'
import styled from 'styled-components'
import { GrayText, Button, Badge, PlusButton } from '../components'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons';
import { patientsApi } from '../utils/api';
import moment from 'moment/moment';
import 'moment/locale/ru';

const PatientScreen = ({ navigation, route }) => {

  const { item } = route.params;

  const [ appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

/*   useEffect(() => {
    const id = item.patient._id;
    patientsApi.show(id).then(({data}) => {
      setAppointments(data.data.appoitments);
      setIsLoading(false);
    }).catch((e) => {
      console.log(e);
      setIsLoading(false);
    })
  }, []) */

  return (
    <View style = {{flex: 1}}>
        <PatientDetails>
          <PatientFullName>{item.patient.fullname}</PatientFullName>
          <GrayText>{item.patient.phone}</GrayText>
          <PattientButtons>
            <FormulaButtonView><FormulaButton>Формула зубов</FormulaButton></FormulaButtonView>
            <PhoneButtonView ><PhoneButton onPress = {() => Linking.openURL('tel:' + item.patient.phone)} color="#84D269"><Foundation name="telephone" size={22} color="white" />
            </PhoneButton></PhoneButtonView>
          </PattientButtons>  
      </PatientDetails>

    {/*   <PatientAppoitments>
        <Container>
          {isLoading 
          ? <ActivityIndicator size="large" color="#2A86FF"/> 
          : appointments.map((appointment) => 
            <AppoitmentCard key = {appointment._id}>
             <AppoitmentCardRow>
               <MaterialCommunityIcons name="tooth-outline" size={24} color="#A3A3A3" />
               <AppoitmentCardLabel>Зуб:<Text style={{fontWeight: 'bold'}}> {appointment.dentNumber ? appointment.dentNumber : 'не указан'}</Text></AppoitmentCardLabel>
             </AppoitmentCardRow>
             <AppoitmentCardRow>
               <Foundation name="clipboard-notes" size={24} color="#A3A3A3" />
               <AppoitmentCardLabel>Диагноз:<Text style={{fontWeight: 'bold'}}> {appointment.diagnosis ? appointment.diagnosis : 'не указан'}</Text></AppoitmentCardLabel>
             </AppoitmentCardRow> 
             <AppoitmentCardRow 
             style = {{ marginTop: 15, justifyContent: 'space-between' }}
             >
               <Badge style = {{ width: 155, marginLeft: 0 }} active>{moment(appointment.date).locale('ru').format('DD.MM.YYYY')} - {appointment.time}</Badge>
               <Badge color='green'>{appointment.price}</Badge>    
             </AppoitmentCardRow>   
           </AppoitmentCard>
         )}
        </Container>
      </PatientAppoitments> */}
      <PlusButton onPress = {() => navigation.navigate('AddAppointment', {
        patientId: item.patient.id
      })}/>
      </View>
  )
}

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