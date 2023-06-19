import React, { useRef } from 'react'
import { Text, View, LogBox, Button } from 'react-native';
import styled from 'styled-components/native';
import { default as GrayText } from './GrayText'
import { default as Badge } from './Badge'
import getAvatarColor from '../utils/getAvatarColor';
import Icon from "react-native-vector-icons/FontAwesome"
import { ActionSheetProvider, useActionSheet  } from "@expo/react-native-action-sheet";

const Appoitment = ({item, navigate}) => {
   const { patient, active, time } = item;

   const avatarColors = getAvatarColor(patient.fullname[0].toUpperCase())

   const { showActionSheetWithOptions } = useActionSheet();

   const openSheet = () => {
      const options = ["Изменить", "Удалить", "Отмена"];
      const destructiveButtonIndex = 1; //the first element in 'options' will denote the Delete option
      const cancelButtonIndex = 2; //Element number 2 in the array will be the 'Cancel' button
      const title = patient.fullname + ' - ' + time;

      const icons = [
         <Icon name="exchange" size={20} />,
         <Icon name="trash" size={20} />,
         <Icon name="remove" size={20} />,
      ];
    
      showActionSheetWithOptions(
        {
          options,
          title,
          cancelButtonIndex, 
          destructiveButtonIndex, 
          icons
        },
        (buttonIndex) => {
            switch (buttonIndex) {
               case 0:
                  console.log('Изменить')
                  return;

               case 1:
                  console.log('Удалить')
                  return;

               case 2:
                  console.log('Отмена')
                  return;
               
               default: 
                  console.log('Обработчик не добавлен')
            }         
        }
      )};
    

return (
       <AppoitmentItem onLongPress={() => openSheet()} onPress = { navigate.bind(this, 'Patient', {item}) }>
            <Avatar style = {{
               backgroundColor: avatarColors.background,
            }}>
               <Letter style = {{
                  color: avatarColors.color,
               }} > 
                  { patient.fullname[0].toUpperCase() }
               </Letter>
            </Avatar>
            <View style= {{style: 'flex: 1'}}>
               <FullName>{patient.fullname}</FullName>
               <GrayText>{patient.diagnosis}</GrayText>
            </View>
            <Badge active = {active}>
               {time}
            </Badge>
         </AppoitmentItem>
   );
} 

Appoitment.defaultProps = {
   groupTitle: 'Untitled',
   items: []
}

const Letter = styled.Text`
   color: white;
   font-size: 20px;
   font-weight: bold;
   margin-bottom: 5px;
`;
const FullName = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;

const AppoitmentItem = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  padding: 20px 20px;
  borderBottomWidth: 1px;
  borderBottomColor: #f3f3f3;
`;

const Avatar = styled.View`
   align-items: center;
   justify-content: center;
   border-radius: 50px;
   width: 40px;
   height: 40px;
   margin-right: 15px;
  `;

export default Appoitment

/* https://blog.logrocket.com/build-custom-react-native-action-sheet/ */