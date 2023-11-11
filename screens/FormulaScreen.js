import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Tooth } from "../components/";
import {
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import { Col } from "react-bootstrap";

const FormulaScreen = ({ navigation, route }) => {
  const [openTable, setOpenTable] = useState(false);
  const leftTeethArray = [];
  const rightTeethArray = [];

  for (let i = 0; i < 8; i++) {
    leftTeethArray.push(
      <Tooth key={i} number={i + 1} setOpenTable={setOpenTable} />
    );
  }

  for (let i = 8; i < 16; i++) {
    rightTeethArray.push(<Tooth key={i} number={i - 7} setOpenTable={setOpenTable} />);
  }

  const tableData = [
    ["Постоянные зубы", "Молочные зубы"],
    ["0", "A"],
    ["1", "B"],
    ["2", "C"],
    ["3", "D"],
    ["4", "E"],
    ["5", "-"],
    ["6", "F"],
    ["7", "G"],
    ["8", "-"],
    ["9", "-"],
    ["T", "T"]
  ];

  return (
    <Container>
      <ScrollView horizontal={true}>
        <Wrapper>
          <LeftTeeth>{leftTeethArray}</LeftTeeth>
          <VerticalLine />
          <RightTeeth>{rightTeethArray}</RightTeeth>
        </Wrapper>
      </ScrollView>
      <Modal isVisible={openTable} backdropOpacity={0.3}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.tableContainer}>
              {tableData.map((row, rowIndex) => (
                <View key={`${row}_${rowIndex}`} style={styles.rowContainer}>
                  {row.map((cellText, colIndex) => {
                    if (rowIndex === 0) {
                      return (
                        <View key={`${row}_${rowIndex}_col_${colIndex}`} style={styles.textContainer}>
                          <Text          
                          style={styles.cellText}
                        >
                          {cellText}
                          </Text>
                        </View>              
                      );
                    } else {
                      return (
                        <TouchableOpacity
                          key={`${colIndex}_${rowIndex}`}
                          style={styles.cellButton}
                        >
                          <Text style={styles.cellText}>{cellText}</Text>
                        </TouchableOpacity>
                      );
                    }
                  })}
                </View>
              ))}
            </View>
            <TouchableOpacity
              onPress={() => {
                setOpenTable(false);
              }}
            >
              <Text>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

const topMargin = Math.round(Dimensions.get("window").height * 0.35);

const styles = StyleSheet.create({
  centeredView: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "80%",
    maxWidth: 400,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tableContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  cellButton: {
    width: 100,
    height: 40,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  textContainer: {
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  cellText: {
    fontSize: 16,
    color: "black",
    textAlign: "center"
  },
});

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
