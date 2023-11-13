import React from "react";

import { Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Button } from "native-base";

const Tooth = ({ /* number, */ setOpenTable/* , index, setToothIndex, setToothPosition */, index, teeth}) => {
  const onPressHandlerTop = () => {
    setOpenTable(true);
/*     setToothIndex(index);
    setToothPosition("T"); */
  };

  const onPressHandlerBottom = () => {
    setOpenTable(true);
/*     setToothIndex(index);
    setToothPosition("B"); */
  };
  
  return (
    <Container>
      <TopButton>
        <Button onPress={() => onPressHandlerTop()}>0</Button>
      </TopButton>
      <MaterialCommunityIcons
        style={{ position: "relative" }}
        name="tooth-outline"
        size={60}
        color="black"
      />
      <ToothNumber>{/* {number} */}0</ToothNumber>
      <BottomButton>
        <Button onPress={() => onPressHandlerBottom()}>0</Button>
      </BottomButton>
    </Container>
  );
};

const Container = styled.View``;

const ToothNumber = styled.Text`
  position: absolute;
  left: 23px;
  top: 6px;
  font-size: 24px;
`;

const TopButton = styled.View`
  position: absolute;
  top: -45px;
  left: 15px;
`;

const BottomButton = styled.View`
  position: absolute;
  top: 65px;
  left: 15px;
`;

export default Tooth;
