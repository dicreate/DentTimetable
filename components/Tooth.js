import React from "react";

import { Text } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import styled from "styled-components/native";

const Tooth = ({number}) => {

   return (
      <Container>
         <MaterialCommunityIcons style={{position: 'relative'}} name="tooth-outline" size={60} color="black" />
         <ToothNumber>{number}</ToothNumber>
      </Container>
   )
}


const Container = styled.View`
`;

const ToothNumber = styled.Text`
position: absolute;
left: 23px;
top: 6px;
font-size: 24px;
`


export default Tooth