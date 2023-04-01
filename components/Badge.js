import React from "react";
import styled from "styled-components";

export default styled.Text`
background: ${props => (props.active ? '#2A86FF' : '#e9f5ff')}
color: ${props => (props.active ? '#fff' : '#4294FF')}
border-radius: 18px;
font-weight: 600;
font-size: 14px;
width: 70px;
height: 32px;
text-align: center;
line-height: 30px;
margin-left: auto;
`