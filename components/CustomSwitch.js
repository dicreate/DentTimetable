import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { Switch, Dimensions } from "react-native";
import { Input } from "native-base";

const CustomSwitch = ({
  title,
  state,
  setState,
  style,
  handleChange,
  name,
  isInput = true,
  value = {value}
}) => {
  return (
    <Container>
      <SwitchContainer style={style}>
        <SwitchText>{title}</SwitchText>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={state ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setState(!state)}
          value={state}
          style={{ left: 0 }}
        />
      </SwitchContainer>
      {state && isInput ? (
        <Input
          variant = "underlined"
          multiline={true}
          placeholder="Введите дополнительную информацию"
          onChange={handleChange.bind(this, name)}
          value={value}
        ></Input>
      ) : null}
    </Container>
  );
};

const windowWidth = Dimensions.get("window").width;

const SwitchContainer = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;

const Container = styled.View``;

const SwitchText = styled.Text`
  width: ${windowWidth - 160}px
`;

export default CustomSwitch;
