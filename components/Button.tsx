import React from "react";
import styled from "styled-components";
import colors from "../style/colors";

interface IProps {
  size: string;
  text: string;
  onClick: string;
  className: string;
}

const getSize = (size: string) => {
  let heigNum;
  let fontNum;
  if (size === "sm") {
    fontNum = 14;
    heigNum = 32;
  } else if (size === "md") {
    fontNum = 10;
    heigNum = 21;
  }
  return `
        height:${heigNum};
        font-size:${fontNum};
    `;
};

const Container = styled.button`
    width:74px;
    ${props => getSize(props)}
    border: 1px solid ${colors.beige_900};
    background-color:${colors.beige_400};
    box-sizing: border-box;
    border-radius: 5px;
    text-align: center;
`;

const Button: React.FC<IProps> = ({ size = "md", onClick, className, text }) => {
  return (
    <Container size={size} onClick={onClick} className={className}>
      {text}
    </Container>
  );
};

export default Button;
