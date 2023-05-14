import React from 'react'
import { SectionList } from 'react-native';
import styled from 'styled-components/native'
import { Appoitment, SectionTitle } from '../components';
import Ionicons from '@expo/vector-icons/Ionicons';

const HomeScreen = ({navigation}) => {

   const DATA = [
      {
        title: '14 сентября',
        data: [ {
          time: '15:30',    
          active: 'true',
          patient: {
            fullname: 'Карина Кузьмич',
            avatar: 'https://sun2.ncot-by-minsk.userapi.com/s/v1/ig2/uG4QK3ph3JTqYhpuDLhutf3jshNI4CXOA6arMlADMKCWvME5Ch4LjOoOyD7u4RwDd8GH9lz-pe6NF7jL_8cLYdiA.jpg?size=100x100&quality=95&crop=1,70,759,759&ava=1',
            diagnosis: 'Обследование',
            phone: +3752932932498
          }
        },
        {
          time: '17:00',    
          patient: {
            fullname: 'Дмитрий Ковчуго',
            avatar: 'https://sun9-48.userapi.com/impg/MhOphtIiXF_ExSjqmqKrPPwnN__V6eorDKCBUg/U-lPP154VH4.jpg?size=810x1080&quality=96&sign=ca48260be27a14ec221edf114e609803&type=album',
            diagnosis: 'Лечение зуба',
            phone: +3752932932498
          }
        },],
      },
      {
        title: '16 сентября',
        data: [{
          time: '09:00',    
          patient: {
            fullname: 'Данателло Пупкин',
            avatar: 'https://sun1.ncot-by-minsk.userapi.com/s/v1/ig2/bHN5Mwcp3lxpjVwV46r_XtSuZN6Oad8LMGEHDOqmLLgu9CTh-3FnwZ7bqglZVCeEbx-Emp1-buQA5w5vCrOsEe6P.jpg?size=100x100&quality=96&crop=482,179,275,275&ava=1',
            diagnosis: 'Пульпит',
            phone: +3752932932498
          }
        }],
      },
      {
        title: '17 сентября',
        data: [{
          time: '10:00',    
          patient: {
            fullname: 'Данателло Смирнов',
            avatar: 'https://sun1.ncot-by-minsk.userapi.com/s/v1/ig2/bHN5Mwcp3lxpjVwV46r_XtSuZN6Oad8LMGEHDOqmLLgu9CTh-3FnwZ7bqglZVCeEbx-Emp1-buQA5w5vCrOsEe6P.jpg?size=100x100&quality=96&crop=482,179,275,275&ava=1',
            diagnosis: 'Пульпит',
            phone: +3752932932498
          },
        },
        {
          time: '11:00',    
          patient: {
            fullname: 'Данателло Смирнов',
            avatar: 'https://sun1.ncot-by-minsk.userapi.com/s/v1/ig2/bHN5Mwcp3lxpjVwV46r_XtSuZN6Oad8LMGEHDOqmLLgu9CTh-3FnwZ7bqglZVCeEbx-Emp1-buQA5w5vCrOsEe6P.jpg?size=100x100&quality=96&crop=482,179,275,275&ava=1',
            diagnosis: 'Пульпит',
            phone: +3752932932498
          },
        },
        {
          time: '12:00',    
          patient: {
            fullname: 'Данателло Смирнов',
            avatar: 'https://sun1.ncot-by-minsk.userapi.com/s/v1/ig2/bHN5Mwcp3lxpjVwV46r_XtSuZN6Oad8LMGEHDOqmLLgu9CTh-3FnwZ7bqglZVCeEbx-Emp1-buQA5w5vCrOsEe6P.jpg?size=100x100&quality=96&crop=482,179,275,275&ava=1',
            diagnosis: 'Пульпит',
            phone: +3752932932498
          },
        },
        {
          time: '13:00',    
          patient: {
            fullname: 'Данателло Смирнов',
            avatar: 'https://sun1.ncot-by-minsk.userapi.com/s/v1/ig2/bHN5Mwcp3lxpjVwV46r_XtSuZN6Oad8LMGEHDOqmLLgu9CTh-3FnwZ7bqglZVCeEbx-Emp1-buQA5w5vCrOsEe6P.jpg?size=100x100&quality=96&crop=482,179,275,275&ava=1',
            diagnosis: 'Пульпит',
            phone: +3752932932498
          },
        },
        {
          time: '14:00',    
          patient: {
            fullname: 'Данателло Смирнов',
            avatar: 'https://sun1.ncot-by-minsk.userapi.com/s/v1/ig2/bHN5Mwcp3lxpjVwV46r_XtSuZN6Oad8LMGEHDOqmLLgu9CTh-3FnwZ7bqglZVCeEbx-Emp1-buQA5w5vCrOsEe6P.jpg?size=100x100&quality=96&crop=482,179,275,275&ava=1',
            diagnosis: 'Пульпит',
            phone: +3752932932498
          },
        },
        {
          time: '15:00',    
          patient: {
            fullname: 'Данателло Смирнов',
            avatar: 'https://sun1.ncot-by-minsk.userapi.com/s/v1/ig2/bHN5Mwcp3lxpjVwV46r_XtSuZN6Oad8LMGEHDOqmLLgu9CTh-3FnwZ7bqglZVCeEbx-Emp1-buQA5w5vCrOsEe6P.jpg?size=100x100&quality=96&crop=482,179,275,275&ava=1',
            diagnosis: 'Пульпит',
            phone: +3752932932498
          },
        }],
      },
    ];
    
  return (
   <Container>
   <SectionList
    sections={DATA}
    keyExtractor={(item, index) => index}
    refreshing = {true}
    renderItem={({item}) => <Appoitment item = {item} navigate = {navigation.navigate}/>}
    renderSectionHeader={({section: {title}}) => (
      <SectionTitle> {title}</SectionTitle>
    )}
  />
  <PlusButton onPress = {navigation.navigate.bind(this,'AddPatient')}>
    <Ionicons name="ios-add" size={36} color="white" />
  </PlusButton>
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