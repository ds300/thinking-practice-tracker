// @flow

import styled from 'styled-components';

export const Button = styled.button`
  padding: 3px 8px 2px;
  background: white;
  border-radius: 3px;
  border: 1px solid #333;
  outline: none;
  margin: 4px;
`;

export const DeleteButton = styled(Button)`
  background: red;
  color: white;
  border: 1px solid red;
  &:hover {
    border: 1px solid white;
  }
`;

export const Input = styled.input`
  padding: 3px 8px 2px;
  border: 1px solid #333;
  border-radius: 0px;
  margin: 4px;
`;

export const Dropdown = styled.select`
  padding: 3px 8px 2px;
  border: 1px solid #333;
  margin: 4px;
  outline: none;
`;

export const TextArea = styled.textarea`
  margin: 4px;
  border: 1px solid #333;
`;
