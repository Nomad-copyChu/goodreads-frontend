import React from "react";
import styled, { css } from "styled-components";
import colors from "../../style/colors";

type Sizes = "medium" | "small";
type Colors = "green" | "github";

const getSize = (size: Sizes) => {
  switch (size) {
    case "medium":
      return css`
        height: 32px;
        font-size: 14px;
      `;
    case "small":
      return css`
        height: 21px;
        font-size: 10px;
      `;
    default:
      return null;
  }
};

const getColor = (color: Colors) => {
  switch (color) {
    case "green":
      return css`
        color: white;
        background-color: ${colors.green_500};
        &:hover {
          background-color: ${colors.green_600};
        }
      `;
    case "github":
      return css`
        color: white;
        background-color: ${colors.github};
        &:hover {
          color: #bebfc1;
          background-color: ${colors.github};
        }
      `;

    default:
      return null;
  }
};

const Container = styled.button<{ size: Sizes; color: Colors }>`
  width: 100%;
  border: 1px solid ${colors.beige_900};
  background-color: ${colors.beige_400};
  border-radius: 5px;
  text-align: center;
  outline: none;
  font-weight: 500;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: ${colors.beige_500};
  }
  ${props => getSize(props.size)}
  ${props => getColor(props.color)}
  :disabled {
    color: ${colors.gray_300};
    background-color: ${colors.gray_400};
  }
`;

interface IProps {
  size?: Sizes;
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  color?: Colors;
  disabled?: boolean;
}

const Button: React.FC<IProps> = ({ size = "medium", onClick, className, children, color, disabled }) => {
  return (
    <Container size={size} onClick={onClick} className={className} color={color} disabled={disabled}>
      {children}
    </Container>
  );
};

export default Button;
