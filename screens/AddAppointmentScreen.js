import React, { useState, useEffect } from "react";
import {
  View,
  LogBox,
  Pressable,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Input, Stack, Button } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components";
import DatePicker from "react-native-modern-datepicker";
import { Calendar, LocaleConfig } from "react-native-calendars";
import LocaleCalendar from "../utils/LocaleCalendar";
import moment from "moment/moment";
import "moment/locale/ru";
import { CustomInput, CustomSwitch } from "../components/";
import { addAppointments } from "../sqlite/requests";

function AddAppointmentScreen({ navigation, route }) {
  LocaleConfig.locales["ru"] = LocaleCalendar.ru;
  LocaleConfig.defaultLocale = "ru";

  const { patientId } = route.params;
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [selected, setSelected] = useState("");
  const [anesthetization, setAnesthetization] = useState(false);

  const [values, setValues] = useState({
    diagnosis: "",
    dentNumber: "",
    price: "",
    date: "",
    time: "",
    patient: patientId,
  });

  const fieldsName = {
    diagnosis: "Диагноз",
    dentNumber: "Номер зуба",
    price: "Цена",
    date: "Дата",
    time: "Время",
  };

  const setFieldValue = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleInputChange = (name, e) => {
    const text = e.nativeEvent.text;
    setFieldValue(name, text);
  };

  const addAppointmentsHandler = () => {
    if (values.date !== "" && values.time !== "") {
      addAppointments(
        values.patient,
        values.dentNumber,
        values.diagnosis,
        values.price,
        values.date,
        values.time,
        anesthetization
      );
      navigation.navigate("HomeScreen", { lastUpdate: new Date() });
    } else alert("Время и дата не должны быть пустыми ");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: openDate || openTime ? "rgba(0, 0, 0, 0.25)" : "#fff",
      }}
    >
      <Stack marginTop="50px" space={0} w="75%" maxW="300px" mx="auto">
        <CustomInput
          title={"Номер зуба"}
          value={values.dentNumber}
          onChange={handleInputChange.bind(this, "dentNumber")}
          autoFocus
          inputMode={"numeric"}
          placeholder="Номер зуба"
        />

        <CustomInput
          title={"Диагноз"}
          value={values.diagnosis}
          onChange={handleInputChange.bind(this, "diagnosis")}
          placeholder="Диагноз"
        />

        <CustomInput
          title={"Цена"}
          value={values.price}
          onChange={handleInputChange.bind(this, "price")}
          inputMode={"numeric"}
          placeholder="Цена"
        />

        <Pressable onPress={() => setOpenDate(!openDate)}>
          <View pointerEvents="none">
            <CustomInput
              title={"Дата"}
              value={
                moment(values.date).locale("ru").format("DD.MM.YYYY") ==
                "Invalid date"
                  ? values.date
                  : moment(values.date).locale("ru").format("DD.MM.YYYY")
              }
              placeholder="Дата"
            />
          </View>
        </Pressable>

        <Pressable onPress={() => setOpenTime(!openDate)}>
          <View pointerEvents="none">
            <CustomInput
              title={"Время"}
              value={values.time}
              placeholder="Время"
            />
          </View>
        </Pressable>

        <CustomSwitch
          title={"Анестезия"}
          state={anesthetization}
          setState={setAnesthetization}
          isInput={false} 
        />

        <ButtonView>
          <Button
            onPress={() => addAppointmentsHandler()}
            size="md"
            w="100%"
            borderRadius={"20px"}
            colorScheme="green"
          >
            <ButtonText>
              <Ionicons name="ios-add" size={20} color="white" />
              Добавить
            </ButtonText>
          </Button>
        </ButtonView>
      </Stack>
      <Modal animationType="slide" transparent={true} visible={openDate}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Calendar
              firstDay={1}
              onDayPress={(date) => {
                setSelected(date.dateString);
              }}
              markedDates={{
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: "orange",
                },
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setFieldValue("date", selected);
                setOpenDate(!openDate);
              }}
            >
              <Text>Выбрать</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={openTime}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DatePicker
              mode="time"
              minuteInterval={1}
              style={{ borderRadius: 10 }}
              onTimeChange={(time) => {
                setFieldValue("time", time);
                setOpenTime(!openTime);
              }}
            />
            <TouchableOpacity onPress={() => setOpenTime(!openTime)}>
              <Text>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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

const ButtonView = styled.View`
  margin-top: 30px;
`;

const ButtonText = styled.Text`
  flex-direction: row;
  color: white;
  font-size: 16px;
`;

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state. Check:",
]);

export default AddAppointmentScreen;
