import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { default as GrayText } from './GrayText'
import { default as Badge } from './Badge'

const Appoitment = ({item, navigate}) => {
   const {user, active, time} = item;

return (
      <AppoitmentItem onPress = {navigate.bind(this, 'Patient', {item})}>
         <Avatar source={{
            uri: user.avatar
            }}>
         </Avatar>
         <View style= {{style: 'flex: 1'}}>
            <FullName>{user.fullname}</FullName>
            <GrayText>{user.diagnosis}</GrayText>
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

const Avatar = styled.Image`
  border-radius: 50px;
  width: 40px;
  height: 40px;
  margin-right: 15px;

  `;

export default Appoitment