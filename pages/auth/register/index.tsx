import React from "react";
import styled from "styled-components";
import { NextPage } from "next";
import RegisterBox from "../../../components/auth/RegisterBox";
import LoginBackground from "../../../components/auth/LoginBackground";

const Container = styled.div`
  overflow: auto;
  .Wrapper {
    position: relative;
  }
`;

const login: NextPage = () => {
  return (
    <Container>
      <div className="Wrapper">
        <RegisterBox />
        <LoginBackground />
      </div>
    </Container>
  );
};

export default login;
