import React from "react";
import Head from "next/head";
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
    <>
      <Head>
        <title>회원가입 | 굿리즈</title>
      </Head>
      <Container>
        <div className="Wrapper">
          <RegisterBox />
          <LoginBackground />
        </div>
      </Container>
    </>
  );
};

export default login;
