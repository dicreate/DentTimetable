import React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'
import { Input } from "native-base";

const CustomInput = ({title, value, onChange, inputMode, variant="underlined" , size = "md", placeholder, autoFocus = false, w = "100%"}) => {

    return (
        <View>
            <InputTitle style = {{opacity: value === '' ? 0 : 1}}>{title}</InputTitle>
            <Input 
                title = {'Номер зуба'}
                value = {value} 
                onChange = {onChange}
                autoFocus = {autoFocus}
                inputMode = {inputMode}
                variant = {variant}
                size= {size}
                placeholder = {placeholder}
                w = {w} 
            />
        </View>        
    )
  }

  const InputTitle = styled.Text`
  margin-top: 5px;
  color: blue;
  font-weight: 500;
  font-style: italic;
`;

export default CustomInput;