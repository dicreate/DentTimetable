import React from 'react'
import { SectionList } from 'react-native';
import styled from 'styled-components/native'
import { Appoitment, SectionTitle } from '../components';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { appoitmentsApi, patientsApi } from '../utils/api'

const HomeScreen = ({navigation}) => {

/*   const DATA = [
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
  ]; */

  const DATA = [
    {
        "title": "19.06.2023",
        "data": [
            {
                "_id": "64835a243a82938d7c943f95",
                "patient": {
                    "_id": "6451fae3163322db3563a575",
                    "fullname": "TEST",
                    "phone": "123456789",
                    "createdAt": "2023-05-03T06:10:43.832Z",
                    "updatedAt": "2023-05-03T06:10:43.832Z",
                    "__v": 0
                },
                "dentNumber": 30,
                "diagnosis": "По приколу ",
                "price": 1500,
                "date": "19.06.2023",
                "time": "14:00",
                "createdAt": "2023-06-09T16:58:12.213Z",
                "updatedAt": "2023-06-09T16:58:12.213Z",
                "__v": 0
            },
            {
                "_id": "64835a253a82938d7c943f98",
                "patient": {
                    "_id": "6451fae3163322db3563a575",
                    "fullname": "TEST",
                    "phone": "123456789",
                    "createdAt": "2023-05-03T06:10:43.832Z",
                    "updatedAt": "2023-05-03T06:10:43.832Z",
                    "__v": 0
                },
                "dentNumber": 30,
                "diagnosis": "По приколу ",
                "price": 1500,
                "date": "19.06.2023",
                "time": "14:00",
                "createdAt": "2023-06-09T16:58:13.257Z",
                "updatedAt": "2023-06-09T16:58:13.257Z",
                "__v": 0
            },
            {
                "_id": "6483645d4782c4462b6fbc09",
                "patient": {
                    "_id": "6451fae3163322db3563a575",
                    "fullname": "TEST",
                    "phone": "123456789",
                    "createdAt": "2023-05-03T06:10:43.832Z",
                    "updatedAt": "2023-05-03T06:10:43.832Z",
                    "__v": 0
                },
                "dentNumber": 30,
                "diagnosis": "По приколу ",
                "price": 1500,
                "date": "19.06.2023",
                "time": "14:00",
                "createdAt": "2023-06-09T17:41:49.438Z",
                "updatedAt": "2023-06-09T17:41:49.438Z",
                "__v": 0
            },
            {
                "_id": "6483645e4782c4462b6fbc0c",
                "patient": {
                    "_id": "6451fae3163322db3563a575",
                    "fullname": "TEST",
                    "phone": "123456789",
                    "createdAt": "2023-05-03T06:10:43.832Z",
                    "updatedAt": "2023-05-03T06:10:43.832Z",
                    "__v": 0
                },
                "dentNumber": 30,
                "diagnosis": "По приколу ",
                "price": 1500,
                "date": "19.06.2023",
                "time": "14:00",
                "createdAt": "2023-06-09T17:41:50.598Z",
                "updatedAt": "2023-06-09T17:41:50.598Z",
                "__v": 0
            }
        ]
    },
    {
        "title": "20.06.2023",
        "data": [
            {
                "_id": "648369bb98c8562d57ca15a2",
                "patient": {
                    "_id": "6451fae3163322db3563a575",
                    "fullname": "TEST",
                    "phone": "123456789",
                    "createdAt": "2023-05-03T06:10:43.832Z",
                    "updatedAt": "2023-05-03T06:10:43.832Z",
                    "__v": 0
                },
                "dentNumber": 30,
                "diagnosis": "По приколу ",
                "price": 1500,
                "date": "20.06.2023",
                "time": "14:00",
                "createdAt": "2023-06-09T18:04:43.862Z",
                "updatedAt": "2023-06-09T18:04:43.862Z",
                "__v": 0
            }
        ]
    }
]


  const [appointmentsData, setAppointmentsData] = useState({});

  useEffect(() => {
    appoitmentsApi.get().then((dataArray) => {
      setAppointmentsData(dataArray.data.data);
    }).catch((e) => console.log(e))}, [])
    
  return (
   <Container>
   <SectionList
    sections={appointmentsData}
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