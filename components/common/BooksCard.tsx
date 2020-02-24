import React from "react";
import styled, { css } from "styled-components";

type Sizes = "large" | "medium" | "small";
type Hover = "info";

const getSize = (size: Sizes) => {
  switch (size) {
    case "large":
      return css`
        width: 150px;
        height: 234px;
      `;
    case "medium":
      return css``;
    case "small":
      return css`
        width: 60px;
        height: 94px;
      `;

    default:
      return null;
  }
};

const Container = styled.img<{ size: Sizes }>`
  ${props => getSize(props.size)}
  border: 1px solid #d8d8d8;
  box-sizing: border-box;
  border-radius: 5px;
`;

interface IProps {
  size?: Sizes;
  className?: string;
  onClick?: () => void;
  src?: any;
  alt?: string;
}

const BooksCard: React.FC<IProps> = ({ size = "large", className, src, alt, onClick }) => {
  return <Container size={size} onClick={onClick} className={className} src={src} alt={alt} />;
};

export default BooksCard;
