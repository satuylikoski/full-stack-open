import React from 'react';
import styled from 'styled-components';

// TODO: Add severity
function Notification({ text }) {
  return <Info>{text}</Info>;
}

const Info = styled.div`
  width: 80%;
  height: 35px;
  background-color: #e8e8e8;
  color: #808080;
  padding: 10px 0 0 5px;
`;

export default Notification;
