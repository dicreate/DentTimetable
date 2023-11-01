import React from "react";
import { View, Dimensions } from "react-native";
import styled from "styled-components/native";
import { default as GrayText } from "./GrayText";
import { default as Badge } from "./Badge";
import getAvatarColor from "../utils/getAvatarColor";

const Appoitment = ({ onLongPress, item, navigate }) => {
  const { fullname, active, time, diagnosis } = item;

  const WindowWidth = Dimensions.get("window").width;

  const avatarColors = getAvatarColor(fullname[0].toUpperCase());

  return (
    <AppoitmentItem
      onLongPress={() => onLongPress(item)}
      onPress={navigate.bind(this, "Patient", { item })}
    >
      <Avatar
        style={{
          backgroundColor: avatarColors.background,
        }}
      >
        <Letter
          style={{
            color: avatarColors.color,
          }}
        >
          {fullname[0].toUpperCase()}
        </Letter>
      </Avatar>
      <View style={{ style: "flex: 1" }}>
        <FullName
          style={{ maxWidth: time ? WindowWidth - 180 : WindowWidth - 90 }}
        >
          {fullname}
        </FullName>
        <GrayText>{diagnosis}</GrayText>
      </View>
      {time && <Badge active={active}>{time}</Badge>}
    </AppoitmentItem>
  );
};

Appoitment.defaultProps = {
  groupTitle: "Untitled",
  items: [],
};

const Letter = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`;
const FullName = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;

const AppoitmentItem = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  padding: 20px 20px;
  borderbottomwidth: 1px;
  borderbottomcolor: #f3f3f3;
`;

const Avatar = styled.View`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  width: 40px;
  height: 40px;
  margin-right: 15px;
`;

export default Appoitment;
