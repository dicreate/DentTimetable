import React from 'react'
import { SectionList } from 'react-native';
import styled from 'styled-components/native'
import { Appoitment, SectionTitle } from '../components';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { appoitmentsApi, patientsApi } from '../utils/api'

const HomeScreen = ({navigation}) => {

  const [appointmentsData, setAppointmentsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAppointments = async () => {
    setIsLoading(true);
    const response = await appoitmentsApi.get()
    setAppointmentsData(response.data.data)
    setIsLoading(false);
  }
  
  useEffect(() => { 
    fetchAppointments();
  }, [])

    
  return (
   <Container>
    {
      appointmentsData 
      ? <>
         <SectionList
            sections={appointmentsData }
            keyExtractor={(item, index) => index}
            onRefresh={fetchAppointments}
            refreshing = {isLoading}
            renderItem={({item}) => <Appoitment item = {item} navigate = {navigation.navigate}/>}
            renderSectionHeader={({section: {title}}) => (
              <SectionTitle> {title}</SectionTitle>
    )}
        />
         <PlusButton onPress = {navigation.navigate.bind(this,'AddPatient')}>
        <Ionicons name="ios-add" size={36} color="white" />
        </PlusButton>
      </>
      : null
    }
  
 
 </Container>
  )
}

const PlusButton = styled.TouchableOpacity`
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  height: 64px;
  width: 64px;
  background: #2a86ff;
  position: absolute; 
  right: 25px;
  bottom: 25px;
  shadow-opacity: 0.7;
  elevation: 4;
  shadow-color: "#2A86FF";
  shadow-radius: 3.5px;
`;

const Container = styled.View`
  flex: 1;
  background: white;
`;

export default HomeScreen