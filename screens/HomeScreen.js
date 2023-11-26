import React from "react";
import { SectionList, Alert, LogBox, ActivityIndicator, Text } from "react-native";
import styled from "styled-components/native";
import { Appoitment, SectionTitle } from "../components";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Spinner, Heading, HStack } from "native-base";
import moment from "moment/moment";
import "moment/locale/ru";
import { reduce, groupBy } from "lodash";
import {
  getAppointmentsWithPatients,
  deleteAppointment,
  getInactiveAppointmentsWithPatients,
  deleteInactiveAppointment,
  endAppointment,
} from "../sqlite/requests";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useRoute } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

function HomeScreen() {
  const route = useRoute()

  return (
    <Tab.Navigator
    initialRouteName="HomeActive"   
    screenOptions={{
      tabBarLabelStyle: { fontSize: 12 }
    }}
    >
      <Tab.Screen
        name="HomeActive"
        component={HomeContent}
        options={{
          tabBarLabel: 'Активные'
        }}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            navigation.navigate('HomeActive', { lastUpdate: new Date() });
          },
        })}
      />
      <Tab.Screen 
        name="HomeInactive" 
        component={HomeContent} 
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            navigation.navigate('HomeInactive', { lastUpdate: new Date() });
          },
        })}
        options={{
          tabBarLabel: 'Завершённые'
        }}
        initialParams={{ lastUpdate: route.params ? route.params.lastUpdate : null}}
      />
    </Tab.Navigator>
  );
}

const HomeContent = ({ navigation }) => {

  const route = useRoute();
  const [appointments, setAppointments] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getAppointments = async () => {
    try {
      setIsLoading(true);
      let appointmentsTable = route.name == "HomeActive" ? await getAppointmentsWithPatients() : await getInactiveAppointmentsWithPatients();
      appointmentsTable.rows.length
        ? setAppointments(
            reduce(
              groupBy(appointmentsTable.rows._array, "date"),
              (result, value, key) => {
                result = [...result, { title: key, data: value }];
                return result;
              },
              []
            )
          )
        : setAppointments("no appointments");
      setIsLoading(false);
    } catch {
      console.log("Ошибка при обращении к базе данных. Таблицы не существует");
    }
  };

  useEffect(() => {
    getAppointments();
  }, [navigation.getState().routes[0].params, navigation.getState().routes[1].params]);

  const { showActionSheetWithOptions } = useActionSheet();

  const endAppointmentHanlder = async(appointmentId) => {
    await endAppointment(appointmentId)
    await navigation.navigate("HomeScreen", { lastUpdate: new Date() });
    await navigation.navigate("HomeActive", { lastUpdate: new Date() });
  }

  const openSheet = (item) => {
    const options = ["Отмена", "Изменить", "Удалить"];
    route.name == "HomeActive" ? options.push('Завершить') : null
    const destructiveButtonIndex = 2; //the first element in 'options' will denote the Delete option
    const cancelButtonIndex = 0; //Element number 2 in the array will be the 'Cancel' button
    const title = item.fullname + " - " + item.time;
    const icons = [
      <Icon name="remove" size={20} />,
      <Icon name="exchange" size={20} />,
      <Icon name="trash" size={20} />,
      <Icon name="check" size={20} />,
    ];

    showActionSheetWithOptions(
      {
        options,
        title,
        cancelButtonIndex,
        destructiveButtonIndex,
        icons,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            return;

          case 1:
            navigation.navigate("ChangeAppointment", {
              item,
            });
            return;

          case 2:
            route.name == "HomeActive" ? deleteAppointment(item.id) : deleteInactiveAppointment(item.id);
            getAppointments();
            return;

          case 3:
            endAppointmentHanlder(item.id);
            return;
    
          default:
            console.log("Обработчик не добавлен");
        }
      }
    );
  };

  return (
    <Container>
      <Wrapper>
        {appointments &&
        appointments !== "no appointments" &&
        appointments !== undefined && !isLoading ? (
          <SectionList
            sections={appointments}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
              <Appoitment
                onLongPress={(itemInfo) => openSheet(itemInfo)}
                item={item}
                navigate={navigation.navigate}
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <SectionTitle>
                {moment(title).locale("ru").format("DD.MM.YY, dd")}
              </SectionTitle>
            )}
          />
        ) : appointments !== "no appointments" && appointments !== undefined ? (
          <HStack space={2} justifyContent="center" marginTop={150}>
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.500" fontSize="md">
              Загрузка
            </Heading>
          </HStack>
        ) : null}
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled.View`
  margin-top: 0px;
`;

const Container = styled.View`
  flex: 1;
  background: white;
`;

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state. Check:",
]);

export default HomeScreen;
