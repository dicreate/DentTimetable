import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, PatientScreen, AddPatientsScreen, AddAppointmentScreen, PatientsScreen } from "./screens";
import { NativeBaseProvider } from "native-base";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

export default function App() {

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
              options={{
                title: 'Список пациентов',
                headerTintColor: '#2A86FF',
                headerStyle: {
                  evelation: 0.8,
                  shadowOpacity: 0.8, 
                }
              }}
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

          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </ActionSheetProvider>
  );
}

