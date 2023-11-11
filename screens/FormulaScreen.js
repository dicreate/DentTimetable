import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Tooth } from "../components/";
import { ScrollView, Dimensions } from "react-native";

const FormulaScreen = ({ navigation, route }) => {

  const TeethArray = []
  for (let i = 0; i < 16; i++) {
    TeethArray.push(<Tooth key={i} number={i + 1} />);
  }

  return (
    <Container>
      <ScrollView horizontal={true}>
        <Wrapper>
          {TeethArray}
        </Wrapper>   
      </ScrollView>
    </Container>
  );
};

const windowHeight = Math.round(Dimensions.get("window").height * 0.35);


const Container = styled.View`
  flex: 1;
  background: white;
`;

const Wrapper = styled.View`
  flex-direction: row;
  margin-top: ${windowHeight}px;
`;

export default FormulaScreen;
