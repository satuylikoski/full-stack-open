import styled, { css } from 'styled-components';

const Button = styled.button`
  min-width: 70px;
  min-height: 25px;
  border-radius: 20px;
  color: white;
  background-color: black;
  font-size: 16px;
  padding: 8px 15px;
  margin: 2px;
  outline-color: #C8C8C8;

  ${props => props.small && css`
    width: 70px;
    height: 25px;
    padding: 2px 5px;
    font-size: 12px;
  `}

  ${props => props.important && css`
    background-color: green;
  `}
`;

export default Button;

