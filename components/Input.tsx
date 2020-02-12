import React from "react";
import styled, { css } from "styled-components";
import { colors } from "../style/colors";

export type InputSizes = "medium" | "small";

const getSize = (size: InputSizes) => {
  switch (size) {
    case "medium":
      return css`
        height: 32px;
        font-size: 14px;
      `;
    case "small":
      return css`
        height: 32px;
        font-size: 10px;
      `;
    default:
      return null;
  }
};

const Container = styled.div<{ size: InputSizes }>`
  input {
    width: 100%;
    padding: 0 12px;
    border-radius: 5px;
    border: 1px solid ${colors.woody_500};
    outline: none;
    &:focus {
      box-shadow: 0 0 4px rgba(185, 173, 153, 0.5);
    }
    & ::placeholder {
      color: ${colors.gray_800};
    }
    ${props => getSize(props.size)}
  }
`;

interface IProps {
  size?: InputSizes;
  placeholder?: string;
  value: string;
  onChange: (e) => void;
  onFocus: () => void;
}

const Input: React.FC<IProps> = ({ size = "medium", placeholder, value, onChange, onFocus }) => {
  return (
    <Container size={size}>
      <input placeholder={placeholder} value={value} onChange={onChange} onFocus={onFocus} />
    </Container>
  );
};

export default Input;
