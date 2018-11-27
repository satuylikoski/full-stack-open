import React from 'react';
import styled from 'styled-components';

function Notification({ name, type }) {
  let text = '';
  if (type === 'error') {
    text = 'Something happened, could not do anything about person named';
  } else {
    text = `You managed to ${type} person named`;
  }
  return (
    <Info>{text} {name}</Info>
  );
}

const Info = styled.div`
  width: 80%;
  height: 35px;
  background-color: #E8E8E8;
  color: #808080;
  padding: 10px 0 0 5px;
`;

export default Notification;