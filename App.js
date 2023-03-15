import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, PatientScreen } from "./screens";



export default function App() {

  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={ HomeScreen }
          options={{ 
            title: 'Пациенты', 
            headerTintColor: '#2A86FF',
            headerStyle: {
              evelation: 0.8,
              shadowOpacity: 0.8, 
            }
          }}
          />
        <Stack.Screen name="Patient" component={ PatientScreen } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

