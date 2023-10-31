import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, PatientScreen, AddPatientsScreen, AddAppointmentScreen, PatientsScreen, ChangeAppointmentScreen, ChangePatientScreen, TeethFormula } from "./screens";
import { NativeBaseProvider } from "native-base";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { createTables, dropTables } from "./sqlite/requests";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Feather } from '@expo/vector-icons'; 
import { useTheme } from 'react-native-paper';
import styled from "styled-components";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      shifting={true}
      screenOptions={{
        tabBarActiveTintColor: '#2A86FF',
      }}
      barStyle={{ backgroundColor: '#fff', borderTopWidth: 1, marginVertical: -13, borderTopColor: '#dedede', justifyContent: 'center',
      alignItems: 'center', alignSelf: 'center'}}
      tabBarLabelStyle = {{
        fontSize: 22,
      }}
    >
      <Tab.Screen 
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        name = "HomeScreen" 
        component =  {HomeScreen} 
        options={({route}) => ({
          tabBarLabel: route.name === 'HomeScreen' ? <TabText>Приёмы</TabText> : null,
          tabBarIcon: ({focused}) => (
            <Ionicons name="clipboard-outline" size = {22} color = {focused ? '#2A86FF' : '#000'}></Ionicons>
          ),
        })}/>
      <Tab.Screen 
        name = "AddPatient" 
        component = {AddPatientsScreen} 
        options={({route}) => ({
          tabBarLabel: route.name === 'AddPatient' ? <TabText>Новый пациент</TabText>: null,
          tabBarIcon: ({focused}) => (
            <Feather name="user-plus" size = {22} color = {focused ? '#2A86FF' : '#000'} />
          ),
        })}
      />
      <Tab.Screen 
        name = "Patients" 
        component = {PatientsScreen} 
        options={({route}) => ({
          tabBarLabel: route.name === 'Patients' ? <TabText>Пациенты</TabText> : null,
          tabBarIcon: ({focused}) => (
            <Feather name="users" size = {22} color = {focused ? '#2A86FF' : '#000'} />
          ),
        })}        
      />
    </Tab.Navigator>
  )
}

function StackNavigator() {
  return (
    <Stack.Navigator>
       <Stack.Screen 
          name="Home" 
          component={ TabNavigator }
          options={{ headerShown: false }}
        />
      <Stack.Screen 
        name="Patient" 
        component={ PatientScreen } 
        options={{
          title: 'Карта пациента',
          headerTintColor: '#2A86FF',
          headerStyle: {
            evelation: 0.8,
            shadowOpacity: 0.8, 
          }
        }}
      />
      <Stack.Screen 
        name="AddAppointment" 
        component={ AddAppointmentScreen } 
        options={{
        title: 'Добавить приём',
        headerTintColor: '#2A86FF',
        headerStyle: {
          evelation: 0.8,
          shadowOpacity: 0.8, 
        }
      }}
      />
       <Stack.Screen 
              name="ChangeAppointment" 
              component={ ChangeAppointmentScreen } 
              options={{
              title: 'Изменение приёма',
              headerTintColor: '#2A86FF',
              headerStyle: {
                evelation: 0.8,
                shadowOpacity: 0.8, 
              }
            }}
            />
            <Stack.Screen 
              name="ChangePatient" 
              component={ ChangePatientScreen } 
              options={{
              title: 'Изменение данных пациента',
              headerTintColor: '#2A86FF',
              headerStyle: {
                evelation: 0.8,
                shadowOpacity: 0.8, 
              }
            }}
            />
             <Stack.Screen 
              name="Formula" 
              component={ TeethFormula } 
              options={{
              title: 'Формула зубов',
              headerTintColor: '#2A86FF',
              headerStyle: {
                evelation: 0.8,
                shadowOpacity: 0.8, 
              }
            }}
            />
    </Stack.Navigator>
  )
}

export default function App () {
  useEffect(() => {
    createTables()
  }, [])

  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent"
  
  return (
    <ActionSheetProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </NativeBaseProvider>
    </ActionSheetProvider>
  )
  
}

const TabText = styled.Text`
  font-size: 11px;
`