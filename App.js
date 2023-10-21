import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, PatientScreen, AddPatientsScreen, AddAppointmentScreen, PatientsScreen, ChangeAppointmentScreen, ChangePatientScreen, TeethFormula } from "./screens";
import { NativeBaseProvider } from "native-base";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { createTables, dropAppointments, dropPatients } from "./sqlite/requests";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Feather } from '@expo/vector-icons'; 
import { useTheme } from 'react-native-paper';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      shifting={true}
      screenOptions={{
        tabBarActiveTintColor: '#2A86FF',
      }}
      barStyle={{ backgroundColor: '#fff', paddingHorizontal: 10, height: 60}}
    >
      <Tab.Screen 
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        name = "HomeScreen" 
        component =  {HomeScreen} 
        options={{
          tabBarLabel: false,
          tabBarIcon: ({focused}) => (
            <Ionicons name="clipboard-outline" size = {24} color = {focused ? '#2A86FF' : '#000'}></Ionicons>
          ),
        }}/>
      <Tab.Screen 
        name = "AddPatient" 
        component = {AddPatientsScreen} 
        options={{
          tabBarLabel: false,
          tabBarIcon: ({focused}) => (
            <Feather name="user-plus" size = {24} color = {focused ? '#2A86FF' : '#000'} />
          ),
        }}
      />
      <Tab.Screen 
        name = "Patients" 
        component = {PatientsScreen} 
        options={{
          tabBarLabel: false,
          tabBarIcon: ({focused}) => (
            <Feather name="users" size = {24} color = {focused ? '#2A86FF' : '#000'} />
          ),
        }}        
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
    /* dropAppointments();
    dropPatients(); */
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

/* export default function App() {

  return (
    <ActionSheetProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
              name="Home" 
              component={ HomeScreen }
              options={({ navigation }) => ({ 
                title: 'Журнал приёмов', 
                headerTintColor: '#2A86FF',
                headerStyle: {
                  evelation: 0.8,
                  shadowOpacity: 0.8, 
                },
                headerRight: () => (
                  <TouchableOpacity
                    style = {{
                      marginRight: 20
                    }}
                    onPress={() => navigation.navigate('Patients')}
                  >
                    <Ionicons name='md-people' size={32}></Ionicons>
                  </TouchableOpacity>
                ),
              })}
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
              name="Patients" 
              component={ PatientsScreen } 
              options={({navigation}) => ({
                title: 'Список пациентов',
                headerTintColor: '#2A86FF',
                headerStyle: {
                  evelation: 0.8,
                  shadowOpacity: 0.8, 
                },
                headerRight: () => (
                  <TouchableOpacity
                    style = {{
                      marginRight: 20
                    }}
                    onPress={() => navigation.navigate('Home')}
                  >
                    <Ionicons name="clipboard-outline" size={32}></Ionicons>
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen 
              name="AddPatient" 
              component={ AddPatientsScreen } 
              options={{
                title: 'Добавить пациента',
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
        </NavigationContainer>
      </NativeBaseProvider>
    </ActionSheetProvider>
  );
} */

