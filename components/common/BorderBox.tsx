import React from "react";
import styled, { css } from "styled-components";

type Size = "lg" | "sm" | "md";

const getSize = (size: Size) => {
  switch (size) {
    case "lg":
      return css`
        width: 425px;
        height: 240px;
      `;
    case "md":
      return css`
        width: 200px;
        height: 284px;
      `;
    case "sm":
      return css`
        width: 468px;
        height: 89px;
      `;
    default:
      return null;
  }
};

const Box = styled.div<{ size: Size }>`
  border: 1px solid #d8d8d8;
  box-sizing: border-box;
  border-radius: 5px;
  ${props => getSize(props.size)}
`;

interface IProps {
  size?: Size;
  className?: string;
  children: React.ReactNode;
}
const BorderBox: React.FC<IProps> = ({ size, className, children }) => {
  return (
    <Box size={size} className={className}>
      {children}
    </Box>
  );
};

export default BorderBox;
