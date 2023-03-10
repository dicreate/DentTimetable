// import { StatusBar } from 'expo-status-bar';
// import { Text, View } from 'react-native';

import { SectionList } from 'react-native';
import styled from 'styled-components/native'
import Group from './components/Group';


export default function App() {
  return (
   <Container>
    <Group title ="14 сентября" items={[
      {
        time: '15:30',    
        active: 'true',
        user: {
          fullname: 'Карина Кузьмич',
          avatar: 'https://sun2.ncot-by-minsk.userapi.com/s/v1/ig2/uG4QK3ph3JTqYhpuDLhutf3jshNI4CXOA6arMlADMKCWvME5Ch4LjOoOyD7u4RwDd8GH9lz-pe6NF7jL_8cLYdiA.jpg?size=100x100&quality=95&crop=1,70,759,759&ava=1',
          diagnosis: 'Обследование',
        }
      },
      {
        time: '17:00',    
        user: {
          fullname: 'Дмитрий Ковчуго',
          avatar: 'https://sun9-48.userapi.com/impg/MhOphtIiXF_ExSjqmqKrPPwnN__V6eorDKCBUg/U-lPP154VH4.jpg?size=810x1080&quality=96&sign=ca48260be27a14ec221edf114e609803&type=album',
          diagnosis: 'Лечение зуба',
        }
      },
    ]
    }></Group>
     <Group title ="16 сентября" items={[
      {
        time: '09:00',    
        user: {
          fullname: 'Данателло Пупкин',
          avatar: 'https://sun1.ncot-by-minsk.userapi.com/s/v1/ig2/bHN5Mwcp3lxpjVwV46r_XtSuZN6Oad8LMGEHDOqmLLgu9CTh-3FnwZ7bqglZVCeEbx-Emp1-buQA5w5vCrOsEe6P.jpg?size=100x100&quality=96&crop=482,179,275,275&ava=1',
          diagnosis: 'Пульпит',
        }
      }
    ]
    }></Group>
     <Group title ="17 сентября" items={[
      {
        time: '10:00',    
        user: {
          fullname: 'Данателло Смирнов',
          avatar: 'https://sun1.ncot-by-minsk.userapi.com/s/v1/ig2/bHN5Mwcp3lxpjVwV46r_XtSuZN6Oad8LMGEHDOqmLLgu9CTh-3FnwZ7bqglZVCeEbx-Emp1-buQA5w5vCrOsEe6P.jpg?size=100x100&quality=96&crop=482,179,275,275&ava=1',
          diagnosis: 'Пульпит',
        },
      },
      {
        time: '11:00',    
        user: {
          fullname: 'Данателло Смирнов',
          avatar: 'https://sun1.ncot-by-minsk.userapi.com/s/v1/ig2/bHN5Mwcp3lxpjVwV46r_XtSuZN6Oad8LMGEHDOqmLLgu9CTh-3FnwZ7bqglZVCeEbx-Emp1-buQA5w5vCrOsEe6P.jpg?size=100x100&quality=96&crop=482,179,275,275&ava=1',
          diagnosis: 'Пульпит',
        },
      },
      {
        time: '12:00',    
        user: {
          fullname: 'Данателло Смирнов',
          avatar: 'https://sun1.ncot-by-minsk.userapi.com/s/v1/ig2/bHN5Mwcp3lxpjVwV46r_XtSuZN6Oad8LMGEHDOqmLLgu9CTh-3FnwZ7bqglZVCeEbx-Emp1-buQA5w5vCrOsEe6P.jpg?size=100x100&quality=96&crop=482,179,275,275&ava=1',
          diagnosis: 'Пульпит',
        },
      },
      {
        time: '13:00',    
        user: {
          fullname: 'Данателло Смирнов',
          avatar: 'https://sun1.ncot-by-minsk.userapi.com/s/v1/ig2/bHN5Mwcp3lxpjVwV46r_XtSuZN6Oad8LMGEHDOqmLLgu9CTh-3FnwZ7bqglZVCeEbx-Emp1-buQA5w5vCrOsEe6P.jpg?size=100x100&quality=96&crop=482,179,275,275&ava=1',
          diagnosis: 'Пульпит',
        },
      },
      {
        time: '14:00',    
        user: {
          fullname: 'Данателло Смирнов',
          avatar: 'https://sun1.ncot-by-minsk.userapi.com/s/v1/ig2/bHN5Mwcp3lxpjVwV46r_XtSuZN6Oad8LMGEHDOqmLLgu9CTh-3FnwZ7bqglZVCeEbx-Emp1-buQA5w5vCrOsEe6P.jpg?size=100x100&quality=96&crop=482,179,275,275&ava=1',
          diagnosis: 'Пульпит',
        },
      },
      {
        time: '15:00',    
        user: {
          fullname: 'Данателло Смирнов',
          avatar: 'https://sun1.ncot-by-minsk.userapi.com/s/v1/ig2/bHN5Mwcp3lxpjVwV46r_XtSuZN6Oad8LMGEHDOqmLLgu9CTh-3FnwZ7bqglZVCeEbx-Emp1-buQA5w5vCrOsEe6P.jpg?size=100x100&quality=96&crop=482,179,275,275&ava=1',
          diagnosis: 'Пульпит',
        },
      }
    ]
    }></Group>
    
     {/* <Group>
      <GroupTitle>
        11 сентября
      </GroupTitle>
      <GroupItem>
        <Avatar source={{
          uri: 'https://sun2.ncot-by-minsk.userapi.com/s/v1/ig2/uG4QK3ph3JTqYhpuDLhutf3jshNI4CXOA6arMlADMKCWvME5Ch4LjOoOyD7u4RwDd8GH9lz-pe6NF7jL_8cLYdiA.jpg?size=100x100&quality=95&crop=1,70,759,759&ava=1'
        }}>
        </Avatar>
        <View style= {{style: 'flex: 1'}}>
          <FullName>Карина Кузьмич</FullName>
          <GrayText>пульпит, удаление зуба</GrayText>
        </View>
        <GroupDate active>
          12:30
        </GroupDate>
      </GroupItem>    
      <GroupItem>
          <Avatar source={{
            uri: 'https://sun2.ncot-by-minsk.userapi.com/s/v1/ig2/uG4QK3ph3JTqYhpuDLhutf3jshNI4CXOA6arMlADMKCWvME5Ch4LjOoOyD7u4RwDd8GH9lz-pe6NF7jL_8cLYdiA.jpg?size=100x100&quality=95&crop=1,70,759,759&ava=1'
          }}>
          </Avatar>
          <View style= {{style: 'flex: 1'}}>
            <FullName>Карина Кузьмич</FullName>
            <GrayText>пульпит, удаление зуба</GrayText>
          </View>
        <GroupDate active>
          12:30
        </GroupDate>
      </GroupItem> 
     </Group> */}
   </Container>
  );
}

const Container = styled.View`
  flex: 1;
  margin-top: 50px;
`;