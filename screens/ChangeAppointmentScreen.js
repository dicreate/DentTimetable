import React, { useState } from 'react'
import { View, LogBox, Pressable, Modal, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Input, Stack, Button } from "native-base";
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components'
import { appoitmentsApi } from '../utils/api';
import DatePicker from 'react-native-modern-datepicker';

function AddAppointmentScreen ({navigation, route}) {

  const { item } = route.params;

  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  
  const [values, setValues] = useState({
    'diagnosis': item.diagnosis,
    'dentNumber': String(item.dentNumber),
    'price': String(item.price),
    'date': item.date,
    'time': item.time,
    'patient': item.patient._id,
  });

  const fieldsName = {
    'diagnosis': 'Диагноз',
    'dentNumber': 'Номер зуба',
    'price': 'Цена',
    'date': 'Дата',
    'time': 'Время',
  }

  const setFieldValue = (name, value) => {
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleInputChange = (name, e) => { 
    const text = e.nativeEvent.text;
    setFieldValue(name, text);
  }

  const onSumbit = () => {
    appoitmentsApi
    .change(item._id, values)
    .then(() => {
      navigation.navigate('Home', { lastUpdate: new Date() });
    }).catch((e) => {
        if (e.response.data && e.response.data.errors) {
          e.response.data.errors.forEach(err => {
            const fieldName = err.path;
            alert(
              `Ошибка! Поле "${fieldsName[fieldName]}" указано неверно.`
            )
        })
      }
    });
  }

  return (
   <View style = {styles.container}>
      <Stack space={5} w="75%" maxW="300px" mx="auto">
        <Input 
          value = {values.dentNumber} 
          onChange = {handleInputChange.bind(this, 'dentNumber')}
          inputMode = {"numeric"}
          variant="underlined" 
          size="md" 
          placeholder="Номер зуба" w="100%" 
        />

        <Input 
          value = {values.diagnosis} 
          onChange = {handleInputChange.bind(this, 'diagnosis')}
          variant="underlined" 
          size="md" 
          placeholder="Диагноз" 
          w="100%" 
        />

        <Input 
          value = {values.price} 
          onChange = {handleInputChange.bind(this, 'price')}
          variant="underlined" 
          inputMode = {"numeric"}
          size="md" 
          placeholder="Цена" 
          w="100%" 
        />

        <Pressable onPress={() => setOpenDate(!openDate)}>
          <View pointerEvents="none" >
            <Input
              value = {values.date} 
              variant="underlined" 
              size="md" 
              placeholder="Дата" 
              w="100%"
            />
          </View>         
        </Pressable>

        
        <Pressable onPress={() => setOpenTime(!openDate)}>
          <View pointerEvents="none" >
            <Input
              value = {values.time} 
              variant="underlined" 
              size="md" 
              placeholder="Время" 
              w="100%"
            />
          </View>         
        </Pressable>

        <ButtonView>
          <Button
          onPress={() => onSumbit()} 
          size="md"
          w="100%" 
          borderRadius={'20px'} 
          colorScheme="green" 
          >
            <ButtonText>
              <Ionicons name="pencil-outline" size={20} color="white" />
              <Text style={{color: 'white'}}>Изменить</Text>
            </ButtonText>  
          </Button>
        </ButtonView>
      </Stack>
      <Modal
          animationType='slide'
          transparent={true}
          visible={openDate}
        >
         <View style = {styles.centeredView}>
            <View style = {styles.modalView}>
                <DatePicker
                  mode='calendar'
                  style={{ borderRadius: 10}}
                  onDateChange = {date =>  setFieldValue('date', date)}
                  selected= {values.date}
                />
                <TouchableOpacity onPress={() => setOpenDate(!openDate)}>
                  <Text>Close</Text>
              </TouchableOpacity>
            </View>
         </View>
        </Modal>

        <Modal
          animationType='slide'
          transparent={true}
          visible={openTime}
        >
         <View style = {styles.centeredView}>
            <View style = {styles.modalView}>
                <DatePicker
                  mode='time'
                  style={{ borderRadius: 10}}
                  onTimeChange = {time =>  {
                    setFieldValue('time', time)
                    setOpenTime(!openTime)
                  }}
                />
                <TouchableOpacity onPress={() => setOpenTime(!openTime)}>
                  <Text>Close</Text>
              </TouchableOpacity>
            </View>
         </View>
        </Modal>
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginTop: 50,
  },

  centeredView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '80%',
    maxWidth: 400,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, 
    shadowRadius: 4,
    elevation: 5,
  }
})

const ButtonView = styled.View`
  margin-top: 30px;
`

const ButtonText = styled.View`
  flex-direction: row;
  color: white;
  font-size: 16px;
  gap: 10px;
`

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state. Check:',
]);

export default AddAppointmentScreen