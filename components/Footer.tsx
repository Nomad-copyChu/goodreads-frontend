import React from "react";
import styled from "styled-components";
import colors from "../style/colors";
import responsive from "../style/responsive";

const Container = styled.div`
  /* position: relative; */
  bottom: 0;
  z-index: 3;
  left: 0;
  border: 1px solid #d8d8d8;
  padding: 5px;
  width: 100%;
  background-color: ${colors.beige_400};
  display: flex;
`;
const Connect = styled.div`
  font-weight: normal;
  font-size: 21px;
  color: ${colors.gray_800};
  margin-top: 7px;
  margin-left: 30px;
  @media (max-width: 400px) {
    margin-left: 10px;
    font-size: 12px;
  }
`;

const Mail = styled.div`
  color: ${colors.gray_600};
  font-size: 12px;
  margin-top: 12px;
  @media (max-width: 400px) {
    font-size: 8px;
    margin-top: 5px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 18px;
`;

const Design = styled.div`
  margin-left: auto;
  margin-right: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: ${colors.gray_600};
  @media (max-width: ${responsive.small}) {
    display: none;
  }
`;

const Footer: React.FC = () => {
  return (
    <Container>
      <Connect>Contact</Connect>
      <Column>
        <Mail>tjerry3@naver.com</Mail>
        <Mail>akakak231@gmail.com</Mail>
      </Column>
      <Design>@Design_Jerrynim</Design>
    </Container>
  );
};
export default Footer;
