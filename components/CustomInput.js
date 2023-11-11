import React, { useRef } from "react";
import styled from "styled-components/native";
import { View, Animated, Text, StyleSheet } from "react-native";
import { Input } from "native-base";

const CustomInput = ({
  title,
  value,
  onChange,
  inputMode,
  variant = "underlined",
  size = "md",
  placeholder,
  autoFocus = false,
  w = "100%",
  style,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      {value === "" ? fadeOut() : fadeIn()}
      <Animated.Text style={[styles.InputTitle, { opacity: fadeAnim }]}>
        {title}
      </Animated.Text>
      <Input
        style={style}
        title={"Номер зуба"}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        inputMode={inputMode}
        variant={variant}
        size={size}
        placeholder={placeholder}
        w={w}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  InputTitle: {
    marginTop: 5,
    color: "#2A86FF",
    fontWeight: 500,
    fontStyle: "italic",
  },
});

export default CustomInput;
