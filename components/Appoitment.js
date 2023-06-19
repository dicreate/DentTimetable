import React, { useRef } from 'react'
import { Text, View, LogBox, Button } from 'react-native';
import styled from 'styled-components/native';
import { default as GrayText } from './GrayText'
import { default as Badge } from './Badge'
import getAvatarColor from '../utils/getAvatarColor';
import ActionSheet from '@alessiocancian/react-native-actionsheet';

const Appoitment = ({item, navigate}) => {
   const { patient, active, time } = item;

   const avatarColors = getAvatarColor(patient.fullname[0].toUpperCase())

   const actionSheet = useRef();
   const optionArray = [
      'Редактировать', 'Удалить', 'Отмена'
   ];
 
   const showActionSheet = () => {
      actionSheet.current.show();
   }

return (
      <>
         <AppoitmentItem onLongPress={showActionSheet} onPress = { navigate.bind(this, 'Patient', {item}) }>
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
         <ActionSheet 
            ref = {actionSheet}
            title = {patient.fullname + ' - ' + time}
            options = {optionArray}
            cancelButtonIndex = {2}
            destructiveButtonIndex={1}
         />
      </>
      
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