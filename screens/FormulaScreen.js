import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Tooth } from "../components/";
import { ScrollView, Dimensions } from "react-native";

const FormulaScreen = ({ navigation, route }) => {

  const leftTeethArray = []
  const rightTeethArray = []

  for (let i = 0; i < 8; i++) {
    leftTeethArray.push(<Tooth key={i} number={i + 1} />);
  }

  for (let i = 8; i < 16; i++) {
    rightTeethArray.push(<Tooth key={i} number={i - 7} />);
  }

  return (
    <Container>
      <ScrollView horizontal={true}>
        <Wrapper>
          <LeftTeeth>
            {leftTeethArray}
          </LeftTeeth>
          <VerticalLine />
          <RightTeeth>
            {rightTeethArray}
          </RightTeeth>
        </Wrapper>   
      </ScrollView>
    </Container>
  );
};

const topMargin = Math.round(Dimensions.get("window").height * 0.35);


const Container = styled.View`
  flex: 1;
  background: white;
`;

const Wrapper = styled.View`
  margin-top: ${topMargin}px;
  flex-direction: row;
`;

const LeftTeeth = styled.View`
  flex-direction: row-reverse;
`;

const RightTeeth = styled.View`
  flex-direction: row;
`;

const VerticalLine = styled.View`
  width: 2px;
  height: 155px;
  background: #2ca395;
  margin-top: -45px;
`;



export default FormulaScreen;
