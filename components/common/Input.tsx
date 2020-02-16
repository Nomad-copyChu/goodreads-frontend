import React from "react";
import styled, { css } from "styled-components";
import colors from "../../style/colors";

export type InputSizes = "medium" | "small";
export type InputColors = "transparent";
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

const getColor = (color: InputColors) => {
  switch (color) {
    case "transparent":
      return css`
        border: none;
        border-bottom: 1px solid ${colors.woody_500};
        font-size: 14px;
        border-radius: 0;
        padding: 0 2px;
        background-color: transparent;
        &:focus {
          box-shadow: none;
        }
      `;

    default:
      return null;
  }
};

const Container = styled.div<{ size: InputSizes; color: InputColors }>`
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
    ${props => getColor(props.color)}
    ${props => getSize(props.size)}
  }
`;

interface IProps {
  size?: InputSizes;
  placeholder?: string;
  value: string;
  type?: string;
  onChange: (e) => void;
  onFocus?: () => void;
  color?: InputColors;
}

const Input: React.FC<IProps> = ({ size = "medium", placeholder, value, onChange, onFocus, type, color }) => {
  return (
    <Container size={size} color={color}>
      <input placeholder={placeholder} value={value} type={type} onChange={onChange} onFocus={onFocus} />
    </Container>
  );
};

export default Input;
