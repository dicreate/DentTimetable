import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styled from "styled-components";
import { GrayText, Button, Badge, PlusButton } from "../components";
import {
  Foundation,
  Fontisto,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import moment from "moment/moment";
import "moment/locale/ru";
import {
  getPatientAppointments,
  getPatientInfo,
  showPatientsInfo,
} from "../sqlite/requests";
import Modal from "react-native-modal";
import * as Animatable from "react-native-animatable";
import Neuron from "../assets/svg/neuron.svg";
import Thyroid from "../assets/svg/thyroid.svg";

const PatientScreen = ({ navigation, route }) => {
  const { item } = route.params;

  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [patientInfo, setPatientInfo] = useState([]);
  const [openInfo, setOpenInfo] = useState(false);

  const getAppointments = async () => {
    const appointmentsTable = await getPatientAppointments(item.patientId);
    appointmentsTable.rows.length
      ? setAppointments(appointmentsTable.rows._array)
      : setAppointments("no appointments");
    setIsLoading(false);
  };

  const getPatientInfoHandler = async () => {
    const patientInfoTable = await getPatientInfo(item.patientId);
    patientInfoTable.rows.length
      ? setPatientInfo(patientInfoTable.rows._array[0])
      : setPatientInfo("no info");
  };

  useEffect(() => {
    getAppointments();
    getPatientInfoHandler();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafd" }}>
      <ScrollView>
        <PatientDetails>
          <PatientContacts>
            <PhoneButtonView>
              <PhoneButton
                onPress={() => Linking.openURL("tel:" + item.phone)}
                color="#84D269"
              >
                <Foundation name="telephone" size={22} color="white" />
              </PhoneButton>
            </PhoneButtonView>
            <View>
              <PatientFullName>{item.fullname}</PatientFullName>
              <GrayText>{item.diagnosis}</GrayText>
            </View>
          </PatientContacts>
          <PattientButtons>
            <ButtonView>
              <Button
                onPress={() =>
                  navigation.navigate("Formula", {
                    patientId: item.patientId,
                  })
                }
              >
                <Text>Формула зубов</Text>
              </Button>
              <Button onPress={() => setOpenInfo(true)}>Информация</Button>
            </ButtonView>
          </PattientButtons>
        </PatientDetails>

        <PatientAppoitments>
          <Container>
            {isLoading ? (
              <ActivityIndicator size="large" color="#2A86FF" />
            ) : appointments !== "no appointments" ? (
              appointments.map((appointment) => (
                <AppoitmentCard key={appointment.id}>
                  <CardRow>
                    <IconContainer>
                      <MaterialCommunityIcons
                        name="tooth-outline"
                        size={24}
                        color="#A3A3A3"
                      />
                    </IconContainer>
                    <AppoitmentCardLabel>
                      <Text>Зуб:</Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {appointment.toothNumber
                          ? appointment.toothNumber
                          : "не указан"}
                      </Text>
                    </AppoitmentCardLabel>
                  </CardRow>
                  <CardRow>
                    <IconContainer>
                      <Foundation
                        name="clipboard-notes"
                        size={24}
                        color="#A3A3A3"
                      />
                    </IconContainer>
                    <AppoitmentCardLabel>
                      <Text>Диагноз:</Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {appointment.diagnosis
                          ? appointment.diagnosis
                          : "не указан"}
                      </Text>
                    </AppoitmentCardLabel>
                  </CardRow>
                  <CardRow>
                    <IconContainer>
                      <Fontisto
                        name="injection-syringe"
                        size={24}
                        color="#A3A3A3"
                      />
                    </IconContainer>
                    <AppoitmentCardLabel>
                      <Text>Анестезия:</Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {appointment.anesthetization ? "Да" : "Нет"}
                      </Text>
                    </AppoitmentCardLabel>
                  </CardRow>
                  <CardRow
                    style={{ marginTop: 15, justifyContent: "space-between" }}
                  >
                    <Badge style={{ width: 155, marginLeft: 0 }} active>
                      {moment(appointment.date)
                        .locale("ru")
                        .format("DD.MM.YYYY")}{" "}
                      - {appointment.time}
                    </Badge>
                    <Badge color="green">{appointment.price}</Badge>
                  </CardRow>
                </AppoitmentCard>
              ))
            ) : null}
          </Container>
        </PatientAppoitments>
      </ScrollView>
      <PlusButton
        onPress={() =>
          navigation.navigate("AddAppointment", {
            patientId: item.id,
          })
        }
      />
      <Modal
        isVisible={openInfo}
        backdropOpacity={0.3}
        onBackButtonPress={() => {
          setOpenInfo(false);
        }}
      >
        <ScrollView>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <CardRow>
                <IconContainer>
                  <MaterialCommunityIcons
                    name="heart-pulse"
                    size={24}
                    color="#A3A3A3"
                  />
                </IconContainer>
                <DiseasesRow>
                  <DiseasesContainer>
                    <Text>Заболевания сердечно-сосудистой системы</Text>
                    {patientInfo.isCardiovascularSystem ? (
                      <DiseasesText>
                        {patientInfo.cardiovascularSystem}
                      </DiseasesText>
                    ) : null}
                  </DiseasesContainer>
                  <Text style={{ fontWeight: "bold" }}>
                    {patientInfo.isCardiovascularSystem ? "Да" : "Нет"}
                  </Text>
                </DiseasesRow>
              </CardRow>
              <CardRow>
                <IconContainer>
                  <Neuron width={24} height={24} fill={"#A3A3A3"} />
                </IconContainer>
                <DiseasesRow>
                  <DiseasesContainer>
                    <Text>Заболевания нервной системы</Text>
                    {patientInfo.isNervousSystem ? (
                      <DiseasesText>{patientInfo.nervousSystem}</DiseasesText>
                    ) : null}
                  </DiseasesContainer>
                  <Text style={{ fontWeight: "bold" }}>
                    {patientInfo.isNervousSystem ? "Да" : "Нет"}
                  </Text>
                </DiseasesRow>
              </CardRow>
              <CardRow>
                <IconContainer>
                  <Thyroid width={24} height={24} fill={"#A3A3A3"} />
                </IconContainer>
                <DiseasesRow>
                  <DiseasesContainer>
                    <Text>Заболевания эндокринной системы</Text>
                    {patientInfo.isEndocrineSystem ? (
                      <DiseasesText>{patientInfo.endocrineSystem}</DiseasesText>
                    ) : null}
                  </DiseasesContainer>
                  <Text style={{ fontWeight: "bold" }}>
                    {patientInfo.isEndocrineSystem ? "Да" : "Нет"}
                  </Text>
                </DiseasesRow>
              </CardRow>
              <CardRow>
                <IconContainer>
                  <MaterialCommunityIcons
                    name="stomach"
                    size={24}
                    color="#A3A3A3"
                  />
                </IconContainer>
                <DiseasesRow>
                  <DiseasesContainer>
                    <Text>Заболевания органов пищеварения</Text>
                    {patientInfo.isDigestive ? (
                      <DiseasesText>{patientInfo.digestive}</DiseasesText>
                    ) : null}
                  </DiseasesContainer>
                  <Text style={{ fontWeight: "bold" }}>
                    {patientInfo.isDigestive ? "Да" : "Нет"}
                  </Text>
                </DiseasesRow>
              </CardRow>
              <CardRow>
                <IconContainer>
                  <FontAwesome5 name="lungs" size={24} color="#A3A3A3" />
                </IconContainer>
                <DiseasesRow>
                  <DiseasesContainer>
                    <Text>Заболевания органов дыхания</Text>
                    {patientInfo.isRespiratory ? (
                      <DiseasesText>{patientInfo.respiratory}</DiseasesText>
                    ) : null}
                  </DiseasesContainer>
                  <Text style={{ fontWeight: "bold" }}>
                    {patientInfo.isRespiratory ? "Да" : "Нет"}
                  </Text>
                </DiseasesRow>
              </CardRow>
              <CardRow>
                <IconContainer>
                  <FontAwesome5 name="virus" size={24} color="#A3A3A3" />
                </IconContainer>
                <DiseasesRow>
                  <DiseasesContainer>
                    <Text>Инфекционные заболевания</Text>
                    {patientInfo.isInfectious ? (
                      <DiseasesText>{patientInfo.infectious}</DiseasesText>
                    ) : null}
                  </DiseasesContainer>
                  <Text style={{ fontWeight: "bold" }}>
                    {patientInfo.isInfectious ? "Да" : "Нет"}
                  </Text>
                </DiseasesRow>
              </CardRow>
              <CardRow>
                <IconContainer>
                  <MaterialCommunityIcons
                    name="allergy"
                    size={24}
                    color="#A3A3A3"
                  />
                </IconContainer>
                <DiseasesRow>
                  <DiseasesContainer>
                    <Text>Аллергические реакции</Text>
                    {patientInfo.isAllergic ? (
                      <DiseasesText>{patientInfo.allergic}</DiseasesText>
                    ) : null}
                  </DiseasesContainer>
                  <Text style={{ fontWeight: "bold" }}>
                    {patientInfo.isAllergic ? "Да" : "Нет"}
                  </Text>
                </DiseasesRow>
              </CardRow>
              <CardRow>
                <IconContainer>
                  <MaterialCommunityIcons
                    name="pill"
                    size={24}
                    color="#A3A3A3"
                  />
                </IconContainer>
                <DiseasesRow>
                  <DiseasesContainer>
                    <Text>Постоянное применение лекарственных средств</Text>
                    {patientInfo.isConstantMedicines ? (
                      <DiseasesText>
                        {patientInfo.constantMedicines}
                      </DiseasesText>
                    ) : null}
                  </DiseasesContainer>
                  <Text style={{ fontWeight: "bold" }}>
                    {patientInfo.isConstantMedicines ? "Да" : "Нет"}
                  </Text>
                </DiseasesRow>
              </CardRow>
              <CardRow>
                <IconContainer>
                  <Entypo name="tools" size={24} color="#A3A3A3" />
                </IconContainer>
                <DiseasesRow>
                  <DiseasesContainer>
                    <Text>Вредные факторы производственной среды</Text>
                    {patientInfo.isHarmfulFactors ? (
                      <DiseasesText>{patientInfo.harmfulFactors}</DiseasesText>
                    ) : null}
                  </DiseasesContainer>
                  <Text style={{ fontWeight: "bold" }}>
                    {patientInfo.isHarmfulFactors ? "Да" : "Нет"}
                  </Text>
                </DiseasesRow>
              </CardRow>
              <CardRow>
                <IconContainer>
                  <MaterialIcons
                    name="pregnant-woman"
                    size={24}
                    color="#A3A3A3"
                  />
                </IconContainer>
                <DiseasesRow>
                  <DiseasesContainer>
                    <Text>Беременность, послеродовый период</Text>
                    {patientInfo.isPregnancy ? (
                      <DiseasesText>{patientInfo.pregnancy}</DiseasesText>
                    ) : null}
                  </DiseasesContainer>
                  <Text style={{ fontWeight: "bold" }}>
                    {patientInfo.isPregnancy ? "Да" : "Нет"}
                  </Text>
                </DiseasesRow>
              </CardRow>
              <CardRow>
                <IconContainer>
                  <Ionicons name="beer" size={24} color="#A3A3A3" />
                </IconContainer>
                <DiseasesRow>
                  <DiseasesContainer>
                    <Text>Алкогольная зависимость</Text>
                    {patientInfo.isAlcohol ? (
                      <DiseasesText>{patientInfo.alcohol}</DiseasesText>
                    ) : null}
                  </DiseasesContainer>
                  <Text style={{ fontWeight: "bold" }}>
                    {patientInfo.isAlcohol ? "Да" : "Нет"}
                  </Text>
                </DiseasesRow>
              </CardRow>
              <CardRow>
                <IconContainer>
                  <MaterialIcons
                    name="smoking-rooms"
                    size={24}
                    color="#A3A3A3"
                  />
                </IconContainer>
                <DiseasesRow>
                  <DiseasesContainer>
                    <Text>Курение</Text>
                    {patientInfo.isSmoking ? (
                      <DiseasesText>{patientInfo.smoking}</DiseasesText>
                    ) : null}
                  </DiseasesContainer>
                  <Text style={{ fontWeight: "bold" }}>
                    {patientInfo.isSmoking ? "Да" : "Нет"}
                  </Text>
                </DiseasesRow>
              </CardRow>
              <CardRow>
                <IconContainer>
                  <FontAwesome
                    name="question-circle"
                    size={24}
                    color="#A3A3A3"
                  />
                </IconContainer>
                <DiseasesRow>
                  <DiseasesContainer>
                    <Text>Другое</Text>
                    {patientInfo.isOther ? (
                      <DiseasesText>{patientInfo.other}</DiseasesText>
                    ) : null}
                  </DiseasesContainer>
                  <Text style={{ fontWeight: "bold" }}>
                    {patientInfo.isOther ? "Да" : "Нет"}
                  </Text>
                </DiseasesRow>
              </CardRow>
              <TouchableOpacity
                style={{ marginTop: 10, alignSelf: "center" }}
                onPress={() => {
                  setOpenInfo(false);
                }}
              >
                <Text>Закрыть</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const WindowWidth = Dimensions.get("window").width;
const diseasesWidth = WindowWidth - 140;

const styles = StyleSheet.create({
  centeredView: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  modalView: {
    backgroundColor: "white",
    width: "100%",
    gap: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  diseasesName: {
    maxWidth: diseasesWidth,
  },
});

const DiseasesContainer = styled.View`
  max-width: ${diseasesWidth}px;
`;

const DiseasesText = styled.Text`
  font-style: italic;
  color: gray;
`;

const PatientContacts = styled.View`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const IconContainer = styled.View`
  width: 28px;
  align-items: center;
`;

const CardRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
`;

const AppoitmentCardLabel = styled.View`
  font-size: 16px;
  flex-direction: row;
  gap: 5px;
`;

const DiseasesRow = styled.View`
  font-size: 16px;
  flex: 2;
  flex-direction: row;
  gap: 5px;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #f3f3f3;
`;

const AppoitmentCard = styled.View`
  shadow-opacity: 0.7;
  elevation: 1;
  shadow-color: black;
  shadow-radius: 10px;
  padding: 20px 25px;
  border-radius: 10px;
  background: white;
  margin-bottom: 20px;
`;
/* shadow-offset: {
  height: 2px;
} */
const Container = styled.View`
  padding: 25px;
`;

const PatientDetails = styled(Container)`
  flex: 0.4;
  background-color: #fff;
`;

const PatientAppoitments = styled.View`
  flex: 1;
`;

const ButtonView = styled.View`
  flex: 1;
  gap: 20px;
`;

const PhoneButtonView = styled.View`
  margin-left: 10px;
  width: 45px;
`;

const PhoneButton = styled(Button)`
  background: #84d269;
  height: 45px;
  width: 45px;
`;

const PattientButtons = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  flex: 1;
`;

const PatientFullName = styled.Text`
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 3px;
`;

export default PatientScreen;
