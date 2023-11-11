import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Dimensions, Keyboard } from "react-native";
import { Stack, Button, HStack } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components";
import { CustomInput, CustomSwitch } from "../components/";
import { addPatients, addPatientsInfo } from "../sqlite/requests";
import Modal from "react-native-modal";

function AddPatientsScreen({ navigation }) {
  const [values, setValues] = useState({
    fullname: "",
    phone: "",
    cardiovascularSystem: "",
    nervousSystem: "",
    endocrineSystem: "",
    digestive: "",
    respiratory: "",
    infectious: "",
    allergic: "",
    constantMedicines: "",
    harmfulFactors: "",
    pregnancy: "",
    alcohol: "",
    smoking: "",
    other: "",
  });

  const WindowWidth = Dimensions.get("window").width;

  /*   const [openInfo, setOpenInfo] = useState(false); */

  const [isCardiovascularSystem, setIsCardiovascularSystem] = useState(false);
  const [isNervousSystem, setIsNervousSystem] = useState(false);
  const [isEndocrineSystem, setIsEndocrineSystem] = useState(false);
  const [isDigestive, setIsDigestive] = useState(false);
  const [isRespiratory, setIsRespiratory] = useState(false);
  const [isInfectious, setIsInfectious] = useState(false);
  const [isAllergic, setIsAllergic] = useState(false);
  const [isConstantMedicines, setIsConstantMedicines] = useState(false);
  const [isHarmfulFactors, setIsHarmfulFactors] = useState(false);
  const [isPregnancy, setIsPregnancy] = useState(false);
  const [isAlcohol, setIsAlcohol] = useState(false);
  const [isSmoking, setIsSmoking] = useState(false);
  const [isOther, setIsOther] = useState(false);

  addPatientHandler = async () => {
    if (values.fullname !== "") {
      const insertId = await addPatients(values.fullname, values.phone);
      await addPatientsInfo(
        insertId,
        isCardiovascularSystem,
        isNervousSystem,
        isEndocrineSystem,
        isDigestive,
        isRespiratory,
        isInfectious,
        isAllergic,
        isConstantMedicines,
        isHarmfulFactors,
        isPregnancy,
        isAlcohol,
        isSmoking,
        isOther,
        values.cardiovascularSystem,
        values.nervousSystem,
        values.endocrineSystem,
        values.digestive,
        values.respiratory,
        values.infectious,
        values.allergic,
        values.constantMedicines,
        values.harmfulFactors,
        values.pregnancy,
        values.alcohol,
        values.smoking,
        values.other
      );
      navigation.navigate("Patients", { lastUpdatePatient: new Date() });
      setValues({
        ["fullname"]: "",
        ["phone"]: "",
      });
      setIsCardiovascularSystem(false);
      setIsNervousSystem(false);
      setIsEndocrineSystem(false);
      setIsDigestive(false);
      setIsRespiratory(false);
      setIsInfectious(false);
      setIsAllergic(false);
      setIsConstantMedicines(false);
      setIsHarmfulFactors(false);
      setIsPregnancy(false);
      setIsAlcohol(false);
      setIsSmoking(false);
      setIsOther(false);
    } else alert("Имя пациента не должно быть пустым");
  };

  const handleChange = (name, e) => {
    const text = e.nativeEvent.text;

    setValues({
      ...values,
      [name]: text,
    });
  };

  return (
    <Container>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Wrapper>
          <Stack space={0} maxW={WindowWidth - 80} mx="auto" my="auto">
            <CustomInput
              title={"Имя и фамилия"}
              value={values.fullname}
              onChange={handleChange.bind(this, "fullname")}
              placeholder="Имя и фамилия"
            />

            <CustomInput
              title={"Номер телефона"}
              value={values.phone}
              dataDetectorTypes={"phoneNumber"}
              onChange={handleChange.bind(this, "phone")}
              inputMode={"tel"}
              placeholder="Номер телефона"
            />
            <SwitchesContainer>
              <CustomSwitch
                title={"Заболевания сердечно-сосудистой системы"}
                state={isCardiovascularSystem}
                setState={setIsCardiovascularSystem}
                handleChange={handleChange}
                name="cardiovascularSystem"
                value={values.cardiovascularSystem}
                values={values}
                setValues={setValues}
              />
              <CustomSwitch
                title={"Заболевания нервной системы"}
                state={isNervousSystem}
                setState={setIsNervousSystem}
                handleChange={handleChange}
                name="nervousSystem"
                value={values.nervousSystem}
                values={values}
                setValues={setValues}
              />
              <CustomSwitch
                title={"Заболевания эндокринной системы"}
                state={isEndocrineSystem}
                setState={setIsEndocrineSystem}
                handleChange={handleChange}
                name="endocrineSystem"
                value={values.endocrineSystem}
                values={values}
                setValues={setValues}
              />
              <CustomSwitch
                title={"Заболевания органов пищеварения"}
                state={isDigestive}
                setState={setIsDigestive}
                handleChange={handleChange}
                name="digestive"
                value={values.digestive}
                values={values}
                setValues={setValues}
              />
              <CustomSwitch
                title={"Заболевания органов дыхания"}
                state={isRespiratory}
                setState={setIsRespiratory}
                handleChange={handleChange}
                name="respiratory"
                value={values.respiratory}
                values={values}
                setValues={setValues}
              />
              <CustomSwitch
                title={"Инфекционные заболевания"}
                state={isInfectious}
                setState={setIsInfectious}
                handleChange={handleChange}
                name="infectious"
                value={values.infectious}
                values={values}
                setValues={setValues}
              />
              <CustomSwitch
                title={"Аллергические реакции"}
                state={isAllergic}
                setState={setIsAllergic}
                handleChange={handleChange}
                name="allergic"
                value={values.allergic}
                values={values}
                setValues={setValues}
              />
              <CustomSwitch
                title={"Постоянное применение лекарственных средств"}
                state={isConstantMedicines}
                setState={setIsConstantMedicines}
                handleChange={handleChange}
                name="constantMedicines"
                value={values.constantMedicines}
                values={values}
                setValues={setValues}
              />
              <CustomSwitch
                title={"Вредные факторы производственной среды"}
                state={isHarmfulFactors}
                setState={setIsHarmfulFactors}
                handleChange={handleChange}
                name="harmfulFactors"
                value={values.harmfulFactors}
                values={values}
                setValues={setValues}
              />
              <CustomSwitch
                title={"Беременность, послеродовый период"}
                state={isPregnancy}
                setState={setIsPregnancy}
                handleChange={handleChange}
                name="pregnancy"
                value={values.pregnancy}
                values={values}
                setValues={setValues}
              />
              <CustomSwitch
                title={"Алкогольная зависимость"}
                state={isAlcohol}
                setState={setIsAlcohol}
                handleChange={handleChange}
                name="alcohol"
                value={values.alcohol}
                values={values}
                setValues={setValues}
              />
              <CustomSwitch
                title={"Курение"}
                state={isSmoking}
                setState={setIsSmoking}
                handleChange={handleChange}
                name="smoking"
                value={values.smoking}
                values={values}
                setValues={setValues}
              />
              <CustomSwitch
                title={"Другое"}
                state={isOther}
                setState={setIsOther}
                handleChange={handleChange}
                name="other"
                value={values.other}
                values={values}
                setValues={setValues}
              />
            </SwitchesContainer>
            <ButtonView>
              {/*   <Button
                  onPress={() => setOpenInfo(true)} 
                  size="md"
                  w="100%" 
                  borderRadius={'20px'} 
                  colorScheme="blue" 
                  >
                  <ButtonText>
                      Дополнительная информация
                  </ButtonText>  
                </Button> */}
              <Button
                onPress={() => {
                  Keyboard.dismiss();
                  addPatientHandler();
                }}
                size="md"
                w="100%"
                borderRadius={"20px"}
                colorScheme="green"
                style={{ alignSelf: "center" }}
              >
                <ButtonText>
                  <Ionicons name="ios-add" size={20} color="white" />
                  Добавить
                </ButtonText>
              </Button>
            </ButtonView>
          </Stack>
          {/*         <Modal
                isVisible={openInfo}
                backdropOpacity={0.3}
                onBackButtonPress = {() => {
                  setOpenInfo(false)   
                }}
              >
                <View style = {styles.centeredView}>
                  <View style = {styles.modalView}>
                    <CustomSwitch title={'Курение'} state = {isSmoking} setState={setIsSmoking}/>
                    <CustomSwitch title={'Беременность'} state = {isPregnancy} setState={setIsPregnancy}/>
                    <TouchableOpacity style = {{marginTop: 10}} onPress={() => {
                        setOpenInfo(false)   
                      }}>
                        <Text>Выбрать</Text>
                    </TouchableOpacity>
                  </View>
              </View>
            </Modal>      */}
        </Wrapper>
      </ScrollView>
    </Container>
  );
}

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
});

const SwitchesContainer = styled.View`
  margin-top: 5px;
  gap: 5px;
`

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Wrapper = styled.View`
  margin-top: 20px;
`;

const ButtonView = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const ButtonText = styled.Text`
  flex-direction: row;
  color: white;
  font-size: 16px;
`;

export default AddPatientsScreen;
