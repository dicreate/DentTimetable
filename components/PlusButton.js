import React from "react";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

const PlusButton = ({ onPress }) => (
  <Circle onPress={onPress}>
    <Ionicons name="ios-add" size={36} color="white" />
  </Circle>
);

const Circle = styled.TouchableOpacity`
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  height: 64px;
  width: 64px;
  background: #f55151;
  position: absolute;
  right: 25px;
  bottom: 25px;
  shadow-opacity: 0.7;
  elevation: 4;
  shadow-color: "#2A86FF";
  shadow-radius: 3.5px;
`;

export default PlusButton;
