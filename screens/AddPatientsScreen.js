import React from 'react'
import { Text,  View } from 'react-native'
import { LogBox } from 'react-native';

function AddPatientsScreen () {

  return (
   <View style = {{flex: 1}}>
      <Text>Form</Text>   
   </View>
  )
}

LogBox.ignoreLogs([
   'Non-serializable values were found in the navigation state',
   'This synthetic event is reused for performance reasons'
 ]);

export default AddPatientsScreen