import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, PatientScreen, AddPatientsScreen, AddAppointmentScreen, PatientsScreen, ChangeAppointmentScreen, ChangePatientScreen } from "./screens";
import { NativeBaseProvider } from "native-base";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { createTables, dropAppointments, dropPatients } from "./sqlite/requests";

export default function App() {

/*   dropAppointments();
  dropPatients(); */

  useEffect(() => {
    createTables()
  }, [])
  
  const Stack = createNativeStackNavigator();
  
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
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </ActionSheetProvider>
  );
}

