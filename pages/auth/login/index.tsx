import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import LoginBackground from "../../../components/auth/LoginBackground";
import LoginBox from "../../../components/auth/LoginBox";

const login: NextPage = () => {
  return (
    <>
      <Head>
        <title>로그인 | 굿리즈</title>
      </Head>
      <LoginBox />
      <LoginBackground />
    </>
  );
};

export default login;
