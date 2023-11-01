import React from "react";
import styled from "styled-components";

const getColor = ({ active, color }) => {
  const colors = {
    green: {
      background: "rgba(132, 210, 105, 0.21)",
      color: "#61BB42",
    },
    active: {
      background: "#2A86FF",
      color: "#fff",
    },
    default: {
      background: "#E9F5FF",
      color: "#4294FF",
    },
  };

  if (active) {
    return colors.active;
  } else if (color && colors[color]) {
    return colors[color];
  } else {
    return colors.default;
  }
};

export default styled.Text`
  margin-left: auto;
  background: ${(props) => getColor(props).background};
  color: ${(props) => getColor(props).color};
  border-radius: 18px;
  font-weight: 600;
  font-size: 14px;
  width: 70px;
  height: 32px;
  text-align: center;
  line-height: 30px;
`;
