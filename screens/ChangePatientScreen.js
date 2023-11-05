import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Dimensions, Keyboard } from "react-native";
import { Stack, Button, HStack, Spinner, Heading } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components";
import { CustomInput, CustomSwitch } from "../components/";
import { changePatient, getPatientInfo } from "../sqlite/requests";

function AddPatientsScreen({ navigation, route }) {
  const { item } = route.params;

  const [patientInfo, setPatientInfo] = useState(null);

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

  const [values, setValues] = useState({
    fullname: item.fullname,
    phone: item.phone,
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

  const getPatientInfoHandler = async () => {
    const patientInfoTable = await getPatientInfo(item.patientId);
    const infoObject = patientInfoTable.rows._array[0];
    patientInfoTable.rows.length
      ? (setPatientInfo(infoObject),
        setIsCardiovascularSystem(Boolean(infoObject.isCardiovascularSystem)),
        setIsNervousSystem(Boolean(infoObject.isNervousSystem)),
        setIsEndocrineSystem(Boolean(infoObject.isEndocrineSystem)),
        setIsDigestive(Boolean(infoObject.isDigestive)),
        setIsRespiratory(Boolean(infoObject.isRespiratory)),
        setIsInfectious(Boolean(infoObject.isInfectious)),
        setIsAllergic(Boolean(infoObject.isAllergic)),
        setIsConstantMedicines(Boolean(infoObject.isConstantMedicines)),
        setIsHarmfulFactors(Boolean(infoObject.isHarmfulFactors)),
        setIsPregnancy(Boolean(infoObject.isPregnancy)),
        setIsAlcohol(Boolean(infoObject.isAlcohol)),
        setIsSmoking(Boolean(infoObject.isSmoking)),
        setIsOther(Boolean(infoObject.isOther)),
        setValues({
          ...values,
          cardiovascularSystem: infoObject.cardiovascularSystem,
          nervousSystem: infoObject.nervousSystem,
          endocrineSystem: infoObject.endocrineSystem,
          digestive: infoObject.digestive,
          respiratory: infoObject.respiratory,
          infectious: infoObject.infectious,
          allergic: infoObject.allergic,
          constantMedicines: infoObject.constantMedicines,
          harmfulFactors: infoObject.harmfulFactors,
          pregnancy: infoObject.pregnancy,
          alcohol: infoObject.alcohol,
          smoking: infoObject.smoking,
          other: infoObject.other,
        }))
      : setPatientInfo("no info");
  };

  const WindowWidth = Dimensions.get("window").width;

  const handleChange = (name, e) => {
    const text = e.nativeEvent.text;

    setValues({
      ...values,
      [name]: text,
    });
  };

  const onSumbit = () => {
    changePatient(
      values.fullname,
      values.phone,
      item.id,
      isSmoking,
      isPregnancy
    );
    navigation.navigate({
      name: "HomeScreen",
      params: { lastUpdate: new Date() },
      merge: true,
    });
    navigation.navigate("Patients", { lastUpdate: new Date() });
  };

  useEffect(() => {
    getPatientInfoHandler();
  }, []);

  return (
    <Container>
      <ScrollView keyboardShouldPersistTaps="handled">
        {patientInfo ? (
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
              <CustomSwitch
                style={{ marginTop: 20 }}
                title={"Заболевания сердечно-сосудистой системы"}
                state={isCardiovascularSystem}
                setState={setIsCardiovascularSystem}
                handleChange={handleChange}
                name="cardiovascularSystem"
                value={values.cardiovascularSystem}
              />
              <CustomSwitch
                title={"Заболевания нервной системы"}
                state={isNervousSystem}
                setState={setIsNervousSystem}
                handleChange={handleChange}
                name="nervousSystem"
                value={values.nervousSystem}
              />
              <CustomSwitch
                title={"Заболевания эндокринной системы"}
                state={isEndocrineSystem}
                setState={setIsEndocrineSystem}
                handleChange={handleChange}
                name="endocrineSystem"
                value={values.endocrineSystem}
              />
              <CustomSwitch
                title={"Заболевания органов пищеварения"}
                state={isDigestive}
                setState={setIsDigestive}
                handleChange={handleChange}
                name="digestive"
                value={values.digestive}
              />
              <CustomSwitch
                title={"Заболевания органов дыхания"}
                state={isRespiratory}
                setState={setIsRespiratory}
                handleChange={handleChange}
                name="respiratory"
                value={values.respiratory}
              />
              <CustomSwitch
                title={"Инфекционные заболевания"}
                state={isInfectious}
                setState={setIsInfectious}
                handleChange={handleChange}
                name="infectious"
                value={values.infectious}
              />
              <CustomSwitch
                title={"Аллергические реакции"}
                state={isAllergic}
                setState={setIsAllergic}
                handleChange={handleChange}
                name="allergic"
                value={values.allergic}
              />
              <CustomSwitch
                title={"Постоянное применение лекарственных средств"}
                state={isConstantMedicines}
                setState={setIsConstantMedicines}
                handleChange={handleChange}
                name="constantMedicines"
                value={values.constantMedicines}
              />
              <CustomSwitch
                title={"Вредные факторы производственной среды"}
                state={isHarmfulFactors}
                setState={setIsHarmfulFactors}
                handleChange={handleChange}
                name="harmfulFactors"
                value={values.harmfulFactors}
              />
              <CustomSwitch
                title={"Беременность, послеродовый период"}
                state={isPregnancy}
                setState={setIsPregnancy}
                handleChange={handleChange}
                name="pregnancy"
                value={values.pregnancy}
              />
              <CustomSwitch
                title={"Алкогольная зависимость"}
                state={isAlcohol}
                setState={setIsAlcohol}
                handleChange={handleChange}
                name="alcohol"
                value={values.alcohol}
              />
              <CustomSwitch
                title={"Курение"}
                state={isSmoking}
                setState={setIsSmoking}
                handleChange={handleChange}
                name="smoking"
                value={values.smoking}
              />
              <CustomSwitch
                title={"Другое"}
                state={isOther}
                setState={setIsOther}
                handleChange={handleChange}
                name="other"
                value={values.other}
              />

              <ButtonView>
                <Button
                  onPress={() => {
                    Keyboard.dismiss();
                    onSumbit();
                  }}
                  size="md"
                  w="100%"
                  borderRadius={"20px"}
                  colorScheme="green"
                  style={{ alignSelf: "center" }}
                >
                  <ButtonText>
                    <Ionicons name="ios-add" size={20} color="white" />
                    Изменить
                  </ButtonText>
                </Button>
              </ButtonView>
            </Stack>
          </Wrapper>
        ) : (
          <HStack flex={1} space={2} justifyContent="center" marginTop={150}>
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.500" fontSize="md">
              Загрузка
            </Heading>
          </HStack>
        )}
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  height: 100%;
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
