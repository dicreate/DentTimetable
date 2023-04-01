import React from 'react'
import { Text,  View } from 'react-native'
import styled from 'styled-components'
import { GrayText, Button, Badge } from '../components'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons';

function PatientScreen ({ route }) {

  const { item } = route.params;

  return (
    <View style = {{flex: 1}}>
        <PatientDetails>
          <PatientFullName>{item.user.fullname}</PatientFullName>
          <GrayText>{item.user.phone}</GrayText>
          <PattientButtons>
            <FormulaButtonView><FormulaButton>Формула зубов</FormulaButton></FormulaButtonView>
            <PhoneButtonView><PhoneButton color="#84D269"><Foundation name="telephone" size={22} color="white" />
            </PhoneButton></PhoneButtonView>
          </PattientButtons>  
      </PatientDetails>

      <PatientAppoitments>
        <Container>
          <AppoitmentCard>
            <AppoitmentCardRow>
              <MaterialCommunityIcons name="tooth-outline" size={24} color="#A3A3A3" />
              <AppoitmentCardLabel>Зуб:<Text style={{fontWeight: 'bold'}}> 12</Text></AppoitmentCardLabel>
            </AppoitmentCardRow>
            <AppoitmentCardRow>
              <Foundation name="clipboard-notes" size={24} color="#A3A3A3" />
              <AppoitmentCardLabel>Диагноз:<Text style={{fontWeight: 'bold'}}> {item.user.diagnosis}</Text></AppoitmentCardLabel>
            </AppoitmentCardRow> 
            <AppoitmentCardRow 
            style = {{ marginTop: 15, justifyContent: 'space-between' }}
            >
              <Badge style = {{ width: 175 }} active>20.03.2023 - 18:50</Badge>
              <Badge color='green'>250р.</Badge>    
            </AppoitmentCardRow>   
          </AppoitmentCard>
        </Container>
      </PatientAppoitments>
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
  shadow-offset: {
    height: 2px;
  }
  padding: 20px 25px;
  border-radius: 10px;
  background: white;
`;

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