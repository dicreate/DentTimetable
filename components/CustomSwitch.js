import React, {useRef, useState} from 'react'
import styled from 'styled-components/native'
import { View, Animated, Text, StyleSheet, Switch } from 'react-native'

const CustomSwitch = ({ title, state, setState }) => {
    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <SwitchContainer style={{display: "flex",}}>
            <Text>{title}</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={state ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setState(!state)}
              value={state}
              style = {{left: 0}}
            />
        </SwitchContainer>        
    )
  }

  const SwitchContainer = styled.View`
 display: flex;
 width: 80%;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 gap: 5px;
`;


  export default CustomSwitch;