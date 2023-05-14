import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { default as GrayText } from './GrayText'
import { default as Badge } from './Badge'

const Appoitment = ({item, navigate}) => {
   const { patient, active, time } = item;

return (
      <AppoitmentItem onPress = { navigate.bind(this, 'Patient', {item}) }>
         <Avatar>
            <Letter>
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
   color: #816CFF;
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
   background-color: #DAD5F8;
  `;

export default Appoitment