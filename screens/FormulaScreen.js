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
import { getTeethFormula, addTeethFormula } from "../sqlite/requests";
import { Spinner, Heading, HStack } from "native-base";
import { keyBy } from "lodash";

const FormulaScreen = ({ navigation, route }) => {
  const [openTable, setOpenTable] = useState(false);
  const [toothIndex, setToothIndex] = useState();
  const [toothPosition, setToothPosition] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [teeth, setTeeth] = useState();
  const item = route.params;
  const [toothIsTop, setToothIsTop] = useState(false);
  const [toothIsBottom, setToothIsBottom] = useState(false);

  const DATA = {
    '1' : {
      "diagnosis": "F", 
      "id": 3, 
      "patientId": 1, 
      "toothIndex": 1, 
      "toothPosition": "T"
    },
    '3': {
      "diagnosis": "F", 
      "id": 4, 
      "patientId": 1, 
      "toothIndex": 3, 
      "toothPosition": "T"
    }
  }

  // console.log(DATA['5'] ? DATA['5'] : null)

  const getTeeth = async () => {
    try {
      setIsLoading(true);
      const teethTable = await getTeethFormula(item.patientId);
      teethTable.rows.length ? setTeeth(
        keyBy(teethTable.rows._array, 'toothIndex')
        ) : null;
      setIsLoading(false);
    } catch {
      console.log("Ошибка при обращении к базе данных");
    }
  };

  useEffect(() => {
    getTeeth();
  }, []);

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
    ["T", "T"],
  ];

  return (
    <Container>
      {teeth ? (
        <>
          <ScrollView horizontal={true}>
            <Wrapper>
              <LeftTeeth>
                {[...Array(8)].map((_, index) => (
                  <Tooth
                    key={index}
                    index={index}
                    number={index + 1}
                    teeth={teeth}
                    setToothIndex={setToothIndex}
                    setToothPosition={setToothPosition}
                    setToothIsTop={setToothIsTop}
                    setToothIsBottom={setToothIsBottom}
                    setOpenTable={setOpenTable}
                    data = {teeth[index] ? teeth[index] : 0}
                  />
                ))}
              </LeftTeeth>
              <VerticalLine />
              <RightTeeth>
                {[...Array(8)].map((_, index) => (
                  <Tooth
                    key={index}
                    index={index + 8}
                    number={index + 1}
                    teeth={teeth}
                    setToothIndex={setToothIndex}
                    setToothPosition={setToothPosition}
                    setOpenTable={setOpenTable}
                    setToothIsTop={setToothIsTop}
                    setToothIsBottom={setToothIsBottom}
                    data = {teeth[index + 8] ? teeth[index + 8] : 0}
                  />
                ))}
              </RightTeeth>
            </Wrapper>
          </ScrollView>
          <Modal isVisible={openTable} backdropOpacity={0.3}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.tableContainer}>
                  {tableData.map((row, rowIndex) => (
                    <View
                      key={`${row}_${rowIndex}`}
                      style={styles.rowContainer}
                    >
                      {row.map((cellText, colIndex) => {
                        if (rowIndex === 0) {
                          return (
                            <View
                              key={`${row}_${rowIndex}_col_${colIndex}`}
                              style={styles.textContainer}
                            >
                              <Text style={styles.cellText}>{cellText}</Text>
                            </View>
                          );
                        } else {
                          return (
                            <TouchableOpacity
                              key={`${colIndex}_${rowIndex}`}
                              style={styles.cellButton}
                              onPress={() => {
                                addTeethFormula({
                                  patientId: item.patientId,
                                  toothIndex,
                                  toothPosition,
                                  diagnosis: cellText,
                                });
                              }}
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
        </>
      ) : (
        <HStack space={2} justifyContent="center" marginTop={150}>
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Загрузка
          </Heading>
        </HStack>
      )}
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
    textAlign: "center",
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
